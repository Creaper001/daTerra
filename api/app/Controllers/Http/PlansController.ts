import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plan from "App/Models/Plan";

export default class PlansController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    return await Plan.all();
  }
}
