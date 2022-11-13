import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Producer from './Producer'

export default class ProducerProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public units: number

  @column()
  public productId: number

  @column()
  public producerId: number

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @belongsTo(() => Producer)
  public producer: BelongsTo<typeof Producer>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
