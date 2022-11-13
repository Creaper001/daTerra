import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserService from "App/Services/UserService";
import Hash from "@ioc:Adonis/Core/Hash";
import Producer from "App/Models/Producer";
import ProducerProduct from "App/Models/ProducerProduct";

export default class ProducersController {
  public async index(ctx: HttpContextContract) {
    const { email, password } = ctx.request.only(["email", "password"]);

    const token = await ctx.auth.use("api").attempt(email, password);
    const user = ctx.auth.use("api").user;
    const producer = await user?.related("producer").query().first();
    if (!producer) return ctx.response.unauthorized();

    return ctx.response.json({
      token,
      user,
      producer,
    });
  }
  public async create(ctx: HttpContextContract) {
    const products = ctx.request.input("products");
    const { history, cpf, rg } = ctx.request.only(["cpf", "rg", "history"]);
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
    const producer = await Producer.create({
      userId: user.id,
      history,
      cpf,
      rg,
    });

    await ProducerProduct.createMany(
      products.map((product: any) => ({
        units: product.units,
        productId: product.id,
        producerId: producer.id,
      }))
    );

    const token = await ctx.auth.use("api").attempt(dataUser.email, password);
    return ctx.response.json({
      token,
      producer,
      user,
    });
  }
}
