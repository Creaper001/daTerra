import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "producer_products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.integer("units").notNullable();

      table
        .integer("producer_id")
        .unsigned()
        .references("id")
        .inTable("producers");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
