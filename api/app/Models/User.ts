import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  beforeCreate,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Consumer from "App/Models/Consumer";
import Producer from "App/Models/Producer";
import Address from "App/Models/Address";
import { v4 as uuid } from "uuid";

export default class User extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public phone: string | null;

  @hasOne(() => Consumer, { foreignKey: "user_id" })
  public consumer: HasOne<typeof Consumer>;

  @hasOne(() => Producer, { foreignKey: "user_id" })
  public producer: HasOne<typeof Producer>;

  @hasMany(() => Address, { foreignKey: "user_id" })
  public addresses: HasMany<typeof Address>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(user: User) {
    user.code = uuid();
  }
}
