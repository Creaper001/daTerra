import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import ProductType from "App/Models/ProductType";

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    const products = await Product.all();
    const productTypes = await ProductType.all();

    const data = {};
    productTypes.forEach((productType) => {
      data[productType.name] = products.filter((product) => {
        return productType.id === product.productTypeId;
      });
    });

    return ctx.response.ok(data);
  }
}
