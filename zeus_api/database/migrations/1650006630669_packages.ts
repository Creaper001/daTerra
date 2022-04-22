import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Packages extends BaseSchema {
  protected tableName = "packages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.integer("review").nullable();
      table
        .string("status")
        .notNullable()
        .queryContext({ enum: ["pending", "approved", "delivered"] });

      table.integer("consumer_id").unsigned().references("id").inTable("consumers");
      table.integer("producer_id").unsigned().references("id").inTable("producers");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.timestamp("delivered_at", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
