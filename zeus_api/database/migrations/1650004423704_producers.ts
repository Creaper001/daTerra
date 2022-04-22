import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Producers extends BaseSchema {
  protected tableName = "producers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("cnpj").notNullable();
      table.string("name").notNullable();
      table.string("history").notNullable();

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
