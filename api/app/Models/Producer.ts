import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import ProducerProduct from "./ProducerProduct";
import Box from "./Box";

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public cpf: string;

  @column()
  public rg: string;

  @column()
  public history: string;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => ProducerProduct)
  public products: HasMany<typeof ProducerProduct>;

  @hasMany(() => Box)
  public boxes: HasMany<typeof Box>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
