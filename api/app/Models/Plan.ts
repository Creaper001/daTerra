import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Consumer from "./Consumer";

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public units: number;

  @column()
  public price: number;

  @column()
  public master: boolean;

  @hasMany(() => Consumer)
  public consumer: HasMany<typeof Consumer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
