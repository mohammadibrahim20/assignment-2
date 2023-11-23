import { Schema, model } from 'mongoose';
import { TUser, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name must be a required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'First Name must be a required'],
  },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: String, enum: ['active', 'deactivate'], required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
});

export const User = model<TUser>('user', userSchema);
