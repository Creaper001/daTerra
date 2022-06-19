import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class SignatureItems extends BaseSchema {
  protected tableName = "signature_itens";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.boolean("units").notNullable();

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE");
      table
        .integer("signature_id")
        .unsigned()
        .references("id")
        .inTable("signatures")
        .onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
