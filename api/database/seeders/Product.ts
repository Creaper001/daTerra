import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Product from "App/Models/Product";

export default class extends BaseSeeder {
  public async run() {
    await Product.createMany([
      {
        image_url: "",
        name: "Abóbora",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Abobrinha",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Batata",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Cebola",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Pepino",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Pimentão",
        productTypeId: 1,
      },
      {
        image_url: "",
        name: "Tomate",
        productTypeId: 1,
      },
    ]);

    await Product.createMany([
      {
        image_url: "",
        name: "Abacate",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Abacaxi",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Açaí",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Caju",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Cacau",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Figo",
        productTypeId: 3,
      },
      {
        image_url: "",
        name: "Jaca",
        productTypeId: 3,
      },
    ]);

    await Product.createMany([
      {
        image_url: "",
        name: "Orégano",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Hortelã",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Coentro",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Couve",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Brócolis",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Alface",
        productTypeId: 2,
      },
      {
        image_url: "",
        name: "Açafrão",
        productTypeId: 2,
      },
    ]);
  }
}
