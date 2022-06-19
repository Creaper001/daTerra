import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";

export default class ProductsController {
  public async index({ auth, response }: HttpContextContract) {
    if (!auth.user) return response.unauthorized();
    return await Product.all();
  }
}
