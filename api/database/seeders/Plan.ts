import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Plan from "App/Models/Plan";

export default class extends BaseSeeder {
  public async run() {
    await Plan.createMany([
      {
        id: 1,
        name: "Pequeno",
        price: 0.0,
        units: 10,
      },
      {
        id: 2,
        name: "Médio",
        price: 0.0,
        units: 15,
        master: true,
      },
      {
        id: 3,
        name: "Grande",
        price: 0.0,
        units: 20,
      },
    ]);
  }
}
