import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import ProductType from "App/Models/ProductType";

export default class extends BaseSeeder {
  public async run() {
    await ProductType.createMany([
      {
        id: 1,
        name: "Legumes",
      },
      {
        id: 2,
        name: "Verduras",
      },
      {
        id: 3,
        name: "Frutas",
      },
    ]);
  }
}
