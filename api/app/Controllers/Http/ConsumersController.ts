import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import Consumer from "App/Models/Consumer";
import ConsumerInterest from "App/Models/ConsumerInterest";
import UserService from "App/Services/UserService";

export default class ConsumersController {
  public async index(ctx: HttpContextContract) {
    const { email, password } = ctx.request.only(["email", "password"]);

    const token = await ctx.auth.use("api").attempt(email, password);
    const user = ctx.auth.use("api").user;
    const consumer = await user?.related("consumer").query().first();
    if (!consumer) return ctx.response.unauthorized();

    return ctx.response.json({
      token,
      user,
      consumer,
    });
  }
  public async create(ctx: HttpContextContract) {
    const interestiIds = ctx.request.input("interest_ids");
    const planId = ctx.request.input("plan_id");
    const dataUser = ctx.request.only(["name", "email", "password", "phone"]);
    const password = dataUser.password;
    dataUser.password = await Hash.make(password);
    const dataAddress = ctx.request.only([
      "state",
      "city",
      "neighborhood",
      "street",
      "number",
      "complement",
    ]);

    const user = await UserService.create(dataUser, dataAddress);
    const consumer = await Consumer.create({
      userId: user.id,
      planId: planId,
    });

    await ConsumerInterest.createMany(
      interestiIds.map((id: string) => ({
        consumerId: consumer.id,
        productId: id,
      }))
    );

    const token = await ctx.auth.use("api").attempt(dataUser.email, password);
    return ctx.response.json({
      token,
      consumer,
      user,
    });
  }
  public async getInterests(ctx: HttpContextContract) {
    await ctx.auth.use("api").authenticate();
    const user = ctx.auth.use("api").user;
    const consumer = await user?.related("consumer").query().first();
    if (!consumer) return ctx.response.unauthorized();

    return await ConsumerInterest.query().where("consumerId", consumer.id);
  }
  public async setInterests(ctx: HttpContextContract) {
    const interestiIds = ctx.request.input("interest_ids");

    await ctx.auth.use("api").authenticate();
    const user = ctx.auth.use("api").user;
    const consumer = await user?.related("consumer").query().first();
    if (!consumer) return ctx.response.unauthorized();

    await ConsumerInterest.query().where("consumerId", consumer.id).delete();
    return await ConsumerInterest.createMany(
      interestiIds.map((id: string) => ({
        consumerId: consumer.id,
        productId: id,
      }))
    );
  }
}
