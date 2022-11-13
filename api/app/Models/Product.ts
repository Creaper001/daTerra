import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import ProductType from "./ProductType";
import ConsumerInterest from "./ConsumerInterest";
import ProducerProduct from "./ProducerProduct";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public image_url: string;

  @column()
  public name: string;

  @column()
  public productTypeId: number;

  @belongsTo(() => ProductType)
  public productType: BelongsTo<typeof ProductType>;

  @belongsTo(() => ConsumerInterest)
  public interests: BelongsTo<typeof ConsumerInterest>;

  @hasMany(() => ProducerProduct)
  public producerProduct: HasMany<typeof ProducerProduct>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
