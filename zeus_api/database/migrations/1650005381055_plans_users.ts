import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class PlansUsers extends BaseSchema {
  protected tableName = "plans_users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(["active", "user_id"]);

      table.boolean("active").notNullable().defaultTo(true);

      table.integer("user_id").unsigned().references("id").inTable("users");
      table.integer("plan_id").unsigned().references("id").inTable("plans");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.timestamp("finished_at", { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
