import Signature from "App/Models/Signature";
import Product from "App/Models/Product";
import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne } from "@ioc:Adonis/Lucid/Orm";

export default class SignatureIten extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public units: number;

  @column()
  public product_id: number;

  @hasOne(() => Product, { foreignKey: "product_id" })
  public product: HasOne<typeof Product>;

  @column()
  public signature_id: number;

  @hasOne(() => Signature, { foreignKey: "signature_id" })
  public signature: HasOne<typeof Signature>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
