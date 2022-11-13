import Address from "App/Models/Address";
import User from "App/Models/User";

export interface DataUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface DataAddress {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  complement?: string;
}

export default class UserService {
  public static async create(dataUser: DataUser, dataAddress: DataAddress) {
    const address = await Address.create(dataAddress);
    return await User.create({
      ...dataUser,
      addressId: address.id,
    });
  }
}
