import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class ProductsPackages extends BaseSchema {
  protected tableName = "products_packages";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(["package_id", "product_id"]);

      table.integer("quantity").notNullable();

      table
        .integer("package_id")
        .unsigned()
        .references("id")
        .inTable("packages")
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
