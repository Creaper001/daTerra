import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuid } from "uuid";

export default class ConsumersController {
  public async index({ auth, request, response }: HttpContextContract) {
    const data = request.only(["cpf"]);

    const user = auth.user;
    if (!user) return response.unauthorized();

    const search = { userId: user.id };
    const create = { ...data, code: uuid() };

    const consumer = await user.related("consumer").firstOrCreate(search, create);
    consumer.cpf = data.cpf;
    consumer.save();

    return response.created({ consumer });
  }
}
