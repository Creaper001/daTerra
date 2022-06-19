import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Signatures extends BaseSchema {
  protected tableName = "signatures";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.boolean("renovation").defaultTo(false);

      table.integer("plan_id").unsigned().references("id").inTable("plans").onDelete("CASCADE");
      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.timestamp("expires_at", { useTz: true }).nullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
