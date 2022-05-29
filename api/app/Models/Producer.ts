import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne, beforeCreate } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import { v4 as uuid } from "uuid";

export default class Producer extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public cnpj: string;

  @column()
  public name: string;

  @column()
  public history: string;

  @column({ serializeAs: null })
  public user_id: number;

  @hasOne(() => User, { foreignKey: "user_id" })
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(producer: Producer) {
    producer.code = uuid();
  }
}
