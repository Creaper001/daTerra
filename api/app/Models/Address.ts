import { DateTime } from "luxon";
import { BaseModel, column, hasOne, HasOne } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public state: string;

  @column()
  public city: string;

  @column()
  public neighborhood: string;

  @column()
  public street: string;

  @column()
  public number: number;

  @column()
  public complement: string;

  @hasOne(() => User)
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
