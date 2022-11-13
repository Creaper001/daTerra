import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "plans";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.string("name", 100).notNullable();
      table.integer("units").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.boolean("master").defaultTo(false);

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
