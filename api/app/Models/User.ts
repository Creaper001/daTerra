import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Address from "./Address";
import Consumer from "./Consumer";
import Producer from "./Producer";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public phone: string;

  @column()
  public addressId: number;

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>;

  @hasOne(() => Consumer)
  public consumer: HasOne<typeof Consumer>;

  @hasOne(() => Producer)
  public producer: HasOne<typeof Producer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
