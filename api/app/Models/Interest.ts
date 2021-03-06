import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Product from "App/Models/Product";

export default class Interest extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public product_id: number;

  @hasOne(() => Product, { foreignKey: "product_id" })
  public product: HasOne<typeof Product>;

  @column({ serializeAs: null })
  public user_id: number;

  @hasOne(() => User, { foreignKey: "user_id" })
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
