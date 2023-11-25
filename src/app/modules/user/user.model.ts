import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config/config';
import { TOrder, TUser, TUserModel, TUserName } from './user.interface';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First Name must be a required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last Name must be a required'],
    },
  },
  { _id: false },
);
const ordersSchema = new Schema<TOrder>({
  price: { type: Number, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// user schema
const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: userNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: String, enum: ['active', 'deactivate'], required: true },
  hobbies: [{ type: String }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [ordersSchema],
});

// password bcrypt before data saved in database
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});

// password string before successful response but using
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

// user exist custom schema
userSchema.statics.isUserExists = async function (userId: number) {
  const user = await User.findOne({ userId });
  return user;
};

export const User = model<TUser, TUserModel>('user', userSchema);
