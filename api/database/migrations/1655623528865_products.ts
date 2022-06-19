import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("code").notNullable();

      table.string("name").notNullable();
      table.string("type").notNullable();

      table.timestamp("expires_at", { useTz: true }).nullable();
      table.timestamp("created_at", { useTz: true }).notNullable();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
