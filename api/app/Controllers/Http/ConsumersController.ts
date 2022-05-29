import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ConsumersController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const consumer = auth.user.related("consumer");
    return await consumer.query().first();
  }
  public async create({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userConsumer = auth.user.related("consumer");

    const isConsumer = await userConsumer.query().first();
    if (isConsumer) return response.conflict();

    const body = request.only(["cpf"]);
    const consumer = await userConsumer.create({ cpf: body.cpf });

    return response.created(consumer);
  }
}
