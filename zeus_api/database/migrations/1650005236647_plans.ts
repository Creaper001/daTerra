import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Plans extends BaseSchema {
  protected tableName = "plans";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("name").notNullable();
      table.string("description").nullable();
      table.string("price").notNullable();
      table.string("size").notNullable();
      table.boolean("active").notNullable().defaultTo(true);

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
