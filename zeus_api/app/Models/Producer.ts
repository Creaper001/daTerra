import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

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
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
