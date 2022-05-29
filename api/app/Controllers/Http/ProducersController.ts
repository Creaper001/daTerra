import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProducersController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const producer = auth.user.related("producer");
    return await producer.query().first();
  }
  public async create({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userProducer = auth.user.related("producer");

    const isProducer = await userProducer.query().first();
    if (isProducer) return response.conflict();

    const body = request.only(["cnpj", "name", "history"]);
    const producer = await userProducer.create({
      cnpj: body.cnpj,
      name: body.name,
      history: body.history,
    });

    return response.created(producer);
  }
}
