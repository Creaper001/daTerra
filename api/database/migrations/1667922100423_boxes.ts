import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "boxes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();

      table.timestamp("delivery_estimated_date").notNullable();
      table.timestamp("delivery_date").nullable();

      table.integer("plan_id").unsigned().references("id").inTable("plans");
      table
        .integer("producer_id")
        .unsigned()
        .references("id")
        .inTable("producers");
      table
        .integer("consumer_id")
        .unsigned()
        .references("id")
        .inTable("consumers");
      table
        .integer("producer_address_id")
        .unsigned()
        .references("id")
        .inTable("addresses");
      table
        .integer("consumer_address_id")
        .unsigned()
        .references("id")
        .inTable("addresses");
      table
        .integer("box_status_id")
        .unsigned()
        .references("id")
        .inTable("box_statuses");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
