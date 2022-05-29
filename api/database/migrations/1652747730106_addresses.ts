import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Addresses extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();
      table.boolean("main").notNullable().defaultTo(false);

      table.string("cep").notNullable();
      table.string("state").notNullable();
      table.string("city").notNullable();
      table.string("neighborhood").notNullable();
      table.string("street").notNullable();
      table.integer("number").notNullable();
      table.string("complement").nullable();
      table.string("description").nullable();
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
