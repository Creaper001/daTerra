import { DateTime } from "luxon";
import { BaseModel, column, beforeCreate } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";
import User from "App/Models/User";

export default class Product extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public type: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: User) {
    user.code = uuid();
  }
}
