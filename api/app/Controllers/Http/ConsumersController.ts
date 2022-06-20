import { DateTime } from "luxon";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import SignatureIten from "App/Models/SignatureIten";

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
  public async getInterests({ auth, response }: HttpContextContract) {
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
    remove.forEach(async (interest: number[]) => {
      await userInterests.query().where("product_id", interest[0]).delete();
    });
    create.forEach(async (interest: number[]) => {
      await userInterests.create({
        product_id: interest[0],
      });
    });

    return await userInterests.query();
  }
  public async getAllSignature({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userSignature = auth.user.related("signature");
    return await userSignature.query().orderBy("created_at", "desc");
  }
  public async getSignature({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userSignature = auth.user.related("signature");
    return await userSignature
      .query()
      .where("created_at", ">", DateTime.local().minus({ month: 1 }).toSQLDate());
  }
  public async setSignature({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();

    const body = request.only(["plans", "renovation"]);
    const create = body.plans.filter((plan) => plan[1] === true);
    const remove = body.plans.filter((plan) => plan[1] === false);

    const userSignature = auth.user.related("signature");
    remove.forEach(async (plan: number[]) => {
      await userSignature
        .query()
        .where("created_at", ">", DateTime.local().minus({ month: 1 }).toSQLDate())
        .where("plan_id", plan[0])
        .delete();
    });
    create.forEach(async (plan: number[]) => {
      await userSignature.create({
        plan_id: plan[0],
      });
    });

    return await userSignature.query();
  }
  public async setRenovation({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();

    const body = request.only(["plan", "renovation"]);
    const userSignature = auth.user.related("signature");
    await userSignature.query().where("plan_id", body.plan).update({
      renovation: body.renovation,
    });

    return await userSignature.query();
  }
  public async setSignatureItems({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();

    const body = request.only(["itens"]);

    const userSignature = await auth.user.related("signature").query().first();
    if (!userSignature) return response.notFound();

    body.itens.forEach(async (item: number[]) => {
      const iten = await SignatureIten.query()
        .where("signature_id", userSignature.id)
        .where("product_id", item[0])
        .first();

      if (iten) {
        iten.units = item[1];
        await iten.save();
      } else {
        await SignatureIten.create({
          signature_id: userSignature.id,
          product_id: item[0],
          units: item[1],
        });
      }
    });

    return await SignatureIten.query().where("signature_id", userSignature.id);
  }
  public async getSignatureItems({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userSignature = await auth.user
      .related("signature")
      .query()
      .where("created_at", ">", DateTime.local().minus({ month: 1 }).toSQLTime())
      .first();
    if (!userSignature) return response.notFound();
    return SignatureIten.query().where("signature_id", userSignature.id);
  }
}
