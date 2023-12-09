/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUserName {
  firstName: string;
  lastName: string;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}
export interface TUser {
  userId: number;
  password: string;
  username: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<TOrder>;
}

export interface TUserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
