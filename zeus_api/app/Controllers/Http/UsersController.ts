import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import { v4 as uuid } from "uuid";
import User from "App/Models/User";

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const data = request.only(["firstname", "lastname", "email", "password", "phone"]);

    data.password = await Hash.make(data.password);
    const user = await User.create({ ...data, code: uuid() });

    return response.created({ user });
  }
  public async login({ auth, request, response }: HttpContextContract) {
    const data = request.only(["email", "password"]);

    try {
      const token = await auth.attempt(data.email, data.password, { expiresIn: "1d" });

      const producers = await token.user.related("producer").query();
      const consumers = await token.user.related("consumer").query();

      return response.accepted({
        auth: token,
        user: token.user,
        producer: producers[0],
        consumer: consumers[0],
      });
    } catch {
      return response.unauthorized();
    }
  }
  public async logout({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.accepted({ revoked: true });
  }
  public async update({ auth, request, response }: HttpContextContract) {
    const data = request.only(["firstname", "lastname", "email", "password", "phone"]);

    try {
      const user = auth.user;
      if (!user) return response.unauthorized();

      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = await Hash.make(data.password);
      user.phone = data.phone;
      await user.save();

      return response.accepted({ user });
    } catch {
      return response.badRequest("Invalid code");
    }
  }
  public async delete({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user;
      if (!user) return response.unauthorized();

      await user.delete();

      return response.accepted({ user });
    } catch {
      return response.badRequest("Invalid code");
    }
  }
}
