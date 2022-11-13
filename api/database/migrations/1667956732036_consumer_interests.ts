import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "consumer_interests";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");
      table
        .integer("consumer_id")
        .unsigned()
        .references("id")
        .inTable("consumers");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
