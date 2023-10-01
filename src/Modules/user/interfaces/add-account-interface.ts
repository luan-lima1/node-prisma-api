import { IAccount } from "./account-interface";

export interface IAddAccount {
  name: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: IAddAccount): IAccount;
}
