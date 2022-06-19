import { DateTime } from "luxon";
import { BaseModel, column, HasOne, hasOne, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Plan from "App/Models/Plan";
import SignatureIten from "./SignatureIten";

export default class Signature extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public renovation: boolean;

  @column()
  public plan_id: number;

  @hasOne(() => Plan, { foreignKey: "product_id" })
  public plan: HasOne<typeof Plan>;

  @column({ serializeAs: null })
  public user_id: number;

  @hasOne(() => User, { foreignKey: "user_id" })
  public user: HasOne<typeof User>;

  @hasMany(() => SignatureIten, { foreignKey: "signature_id" })
  public items: HasMany<typeof SignatureIten>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public expiresAt: DateTime;
}
