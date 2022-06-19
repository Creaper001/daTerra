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
  public async getInterests({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userInterests = auth.user.related("interests");
    return await userInterests.query();
  }
  public async setInterests({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();

    const body = request.only(["interests"]);
    const create = body.interests.filter((interest) => interest[1] === true);
    const remove = body.interests.filter((interest) => interest[1] === false);

    const userInterests = auth.user.related("interests");
    remove.forEach(async (interest) => {
      await userInterests.query().where("product_id", interest[0]).delete();
    });
    create.forEach(async (interest) => {
      await userInterests.create({
        product_id: interest[0],
      });
    });

    return await userInterests.query();
  }
}
