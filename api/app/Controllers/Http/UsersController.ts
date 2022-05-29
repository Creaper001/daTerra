import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class UsersController {
  public async login({ auth, request, response }: HttpContextContract) {
    const body = request.only(["email", "password"]);
    const token = await auth.use("api").attempt(body.email, body.password);
    return response.json(token);
  }
  public async index({ auth }: HttpContextContract) {
    return auth.user;
  }
  public async create({ request, response }: HttpContextContract) {
    const body = request.only(["name", "email", "password", "phone"]);
    const hashPassword = await Hash.make(body.password);

    const isUser = await User.findBy("email", body.email);
    if (isUser) return response.conflict();

    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = hashPassword;
    user.phone = body.phone;
    await user.save();

    return response.created(user);
  }
  public async update({ auth, request, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    const body = request.only(["name", "email", "password", "newPassword", "phone"]);

    if (body.password === "" || body.newPassword === "") return response.badRequest();

    const verify = await Hash.verify(auth.user.password, body.password);
    if (!verify) return response.unauthorized();

    const hashPassword = await Hash.make(body.newPassword);

    const user = auth.user;
    user.name = body.name;
    user.email = body.email;
    user.password = hashPassword;
    user.phone = body.phone;
    await user.save();

    return response.accepted(user);
  }
}
