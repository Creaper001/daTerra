import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Plan from "./Plan";
import Producer from "./Producer";
import Consumer from "./Consumer";
import Address from "./Address";
import BoxStatus from "./BoxStatus";

export default class Box extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column.dateTime()
  public delivery_estimated_date: DateTime;

  @column.dateTime()
  public delivery_date: DateTime;

  @column()
  public planId: number;

  @belongsTo(() => Plan)
  public plan: BelongsTo<typeof Plan>;

  @column()
  public producerId: number;

  @belongsTo(() => Producer)
  public producer: BelongsTo<typeof Producer>;

  @column()
  public consumerId: number;

  @belongsTo(() => Consumer)
  public consumer: BelongsTo<typeof Consumer>;

  @column()
  public producerAddressId: number;

  @belongsTo(() => Address)
  public producerAddress: BelongsTo<typeof Address>;

  @column()
  public consumerAddressId: number;

  @belongsTo(() => Address)
  public consumerAddress: BelongsTo<typeof Address>;

  @column()
  public boxStatusId: number;

  @belongsTo(() => BoxStatus)
  public boxStatus: BelongsTo<typeof BoxStatus>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
