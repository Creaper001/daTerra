import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Consumers extends BaseSchema {
  protected tableName = "consumers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("cpf").notNullable();

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
