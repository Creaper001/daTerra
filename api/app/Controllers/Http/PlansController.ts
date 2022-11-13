import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Plan from "App/Models/Plan";

export default class PlansController {
  public async index(ctx: HttpContextContract) {
    const plans = await Plan.all();
    return ctx.response.ok(plans);
  }
}
