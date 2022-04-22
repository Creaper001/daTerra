import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import Producer from "App/Models/Producer";
import Consumer from "App/Models/Consumer";

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public firstname: string;

  @column()
  public lastname: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public phone: string;

  @hasOne(() => Producer)
  public producer: HasOne<typeof Producer>;

  @hasOne(() => Consumer)
  public consumer: HasOne<typeof Consumer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
