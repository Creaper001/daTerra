import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class InterestsUsers extends BaseSchema {
  protected tableName = "interests_users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(["user_id", "product_id"]);

      table.boolean("active").notNullable().defaultTo(true);

      table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
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
