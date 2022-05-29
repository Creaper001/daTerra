import { DateTime } from "luxon";
import { BaseModel, column, beforeCreate } from "@ioc:Adonis/Lucid/Orm";
import { v4 as uuid } from "uuid";

export default class Address extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number;

  @column()
  public code: string;

  @column()
  public main: boolean;

  @column()
  public cep: string;

  @column()
  public state: string;

  @column()
  public city: string;

  @column()
  public neighborhood: string;

  @column()
  public street: string;

  @column()
  public number: number;

  @column()
  public complement: string;

  @column()
  public description: string;

  @column({ serializeAs: null })
  public user_id: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static assignUuid(address: Address) {
    address.code = uuid();
  }
}
