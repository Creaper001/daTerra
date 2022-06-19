import { DateTime } from "luxon";
import { BaseModel, column, beforeCreate } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class Plan extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public units: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: Plan) {
    user.code = uuid();
  }
}
