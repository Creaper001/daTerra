import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AddressesController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const consumer = auth.user.related("addresses");
    return await consumer.query();
  }
  public async create({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userAddresses = auth.user.related("addresses");

    const body = request.only([
      "cep",
      "state",
      "city",
      "neighborhood",
      "street",
      "number",
      "complement",
      "description",
    ]);
    const address = await userAddresses.create({
      cep: body.cep,
      state: body.state,
      city: body.city,
      neighborhood: body.neighborhood,
      street: body.street,
      number: Number(body.number),
      complement: body.complement,
      description: body.description,
    });

    return response.created(address);
  }
  public async delete({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userAddresses = auth.user.related("addresses");

    const body = request.param("code");

    const address = await userAddresses.query().where("code", body).first();

    if (!address) return response.notFound();
    await address.delete();

    return response.created(address);
  }
  public async main({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const userAddresses = auth.user.related("addresses");

    const body = request.param("code");

    const addressMain = await userAddresses.query().where("main", true).first();
    const addressCode = await userAddresses.query().where("code", body).first();

    if (!addressMain || !addressCode) return response.notFound();

    addressMain.main = false;
    await addressMain.save();

    addressCode.main = true;
    await addressCode.save();

    return response.created(addressCode);
  }
}
