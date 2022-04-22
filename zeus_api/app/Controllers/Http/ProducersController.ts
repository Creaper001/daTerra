import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { v4 as uuid } from "uuid";

export default class ProducersController {
  public async index({ auth, request, response }: HttpContextContract) {
    const data = request.only(["cnpj", "name", "history"]);

    const user = auth.user;
    if (!user) return response.unauthorized();

    const search = { userId: user.id };
    const create = { ...data, code: uuid() };

    const producer = await user.related("producer").firstOrCreate(search, create);
    producer.cnpj = data.cnpj;
    producer.name = data.name;
    producer.history = data.history;
    producer.save();

    return response.created({ producer });
  }
}
