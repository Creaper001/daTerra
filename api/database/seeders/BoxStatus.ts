import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import BoxStatus from "App/Models/BoxStatus";

export default class extends BaseSeeder {
  public async run() {
    await BoxStatus.createMany([
      {
        name: "Em preparação",
      },
      {
        name: "Entregue",
      },
      {
        name: "Devolvido",
      },
    ]);
  }
}
