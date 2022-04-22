import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ProductsProducers extends BaseSchema {
  protected tableName = "products_producers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(["producer_id", "product_id"]);

      table.integer("quantity").notNullable().defaultTo(0);

      table
        .integer("producer_id")
        .unsigned()
        .references("id")
        .inTable("producers")
        .onDelete("CASCADE");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
