import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Plan from "./Plan";
import ConsumerInterest from "./ConsumerInterest";
import Box from "./Box";

export default class Consumer extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public planId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Plan)
  public plan: BelongsTo<typeof Plan>;

  @hasMany(() => ConsumerInterest)
  public interests: HasMany<typeof ConsumerInterest>;

  @hasMany(() => Box)
  public boxes: HasMany<typeof Box>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
