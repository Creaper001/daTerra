import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Notifications extends BaseSchema {
  protected tableName = "notifications";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("title").notNullable();
      table.string("body").notNullable();
      table
        .string("type")
        .notNullable()
        .queryContext({ enum: ["alert", "info"] });
      table
        .string("status")
        .notNullable()
        .queryContext({ enum: ["sent", "visualized", "removed"] });

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.timestamp("visualized_at", { useTz: true }).nullable();
      table.timestamp("removed_at", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
