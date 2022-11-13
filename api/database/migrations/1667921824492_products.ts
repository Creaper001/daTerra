import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.string("image_url", 200).nullable();
      table.string("name", 100).notNullable();

      table
        .integer("product_type_id")
        .unsigned()
        .references("id")
        .inTable("product_types");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
