import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Plans extends BaseSchema {
  protected tableName = "plans";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("name").notNullable();
      table.decimal("price", 10, 2).notNullable();
      table.integer("units").notNullable();

      table.timestamp("expires_at", { useTz: true }).nullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
