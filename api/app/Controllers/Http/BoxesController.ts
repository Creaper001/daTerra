import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Box from "App/Models/Box";
import Consumer from "App/Models/Consumer";
import Producer from "App/Models/Producer";
import { DateTime } from "luxon";

export default class BoxesController {
  public async consumers(ctx: HttpContextContract) {
    await ctx.auth.use("api").authenticate();
    const user = ctx.auth.use("api").user;
    const consumer = await user?.related("consumer").query().first();
    if (!consumer) return ctx.response.unauthorized();

    const boxes = await consumer
      .related("boxes")
      .query()
      .preload("boxStatus")
      .preload("plan")
      .preload("producer", (preloader) => {
        preloader.preload("user");
      });

    return ctx.response.json(boxes);
  }
  public async producers(ctx: HttpContextContract) {
    await ctx.auth.use("api").authenticate();
    const user = ctx.auth.use("api").user;
    const producer = await user?.related("producer").query().first();
    if (!producer) return ctx.response.unauthorized();

    const boxes = await producer
      .related("boxes")
      .query()
      .preload("plan")
      .preload("consumer", (preloader) => {
        preloader.preload("user", (subPreloader) => {
          subPreloader.preload("address");
        });
        preloader.preload("interests", (subPreloader) => {
          subPreloader.preload("product");
        });
      });
    return ctx.response.json(boxes);
  }
  public async create(ctx: HttpContextContract) {
    const consumers = await Consumer.query().preload("interests");
    const producers = await Producer.query().preload("products");

    const match = consumers.map((consumer) => {
      const interestsIds = consumer.interests.map(
        (interests) => interests.productId
      );

      let producer = null as any;
      producers
        .map((producer) => {
          const productsIds = producer.products.map(
            (product) => product.productId
          );
          const match = productsIds.filter((id) => {
            return interestsIds.includes(id);
          });
          return { id: producer.id, match };
        })
        .forEach((data) => {
          if (!producer || data.match.length > producer.match.length) {
            producer = data;
          }
        });

      return { producer: producer.id, consumer: consumer.id };
    });

    match.forEach(async ({ producer, consumer }) => {
      const date = new Date();
      const consumerData = consumers.find(({ id }) => id === consumer);
      const consumerUser = await consumerData?.related("user").query().first();
      const producerData = producers.find(({ id }) => id === consumer);
      const producerUser = await producerData?.related("user").query().first();

      await Box.create({
        delivery_estimated_date: DateTime.fromJSDate(date).plus({ day: 7 }),
        producerId: producer,
        consumerId: consumer,
        consumerAddressId: consumerUser?.addressId,
        producerAddressId: producerUser?.addressId,
        planId: consumerData?.planId,
        boxStatusId: 1,
      });
    });

    return ctx.response.json(match);
  }
}
