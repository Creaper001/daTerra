import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.string("state", 100).notNullable();
      table.string("city", 100).notNullable();
      table.string("neighborhood", 200).notNullable();
      table.string("street", 100).notNullable();
      table.integer("number").notNullable();
      table.string("complement", 100).nullable();

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
