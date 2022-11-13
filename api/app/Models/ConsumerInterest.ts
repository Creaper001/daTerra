import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Consumer from "./Consumer";
import Product from "./Product";

export default class ConsumerInterest extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public productId: number;

  @column()
  public consumerId: number;

  @belongsTo(() => Consumer)
  public consumer: BelongsTo<typeof Consumer>;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
