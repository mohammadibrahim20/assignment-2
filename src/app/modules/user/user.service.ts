import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const creatUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
const getAllUserIntoDB = async () => {
  const result = await User.find({}).select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });

  return result;
};
const getSingleUserIntoDB = async (id: number) => {
  const result = await User.find({ userId: id }).select(
    '-password -orders -_id',
  );
  return result;
};
const updateUserIntoDB = async (updateData: TUser, userId: number) => {
  const result = await User.updateOne({ userId }, { $set: { ...updateData } });
  return result;
};
const updateUserOrderIntoDb = async (userId: number, orderData: TOrder) => {
  const newProduct = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { returnOriginal: false },
  ).select('orders -_id');
  return newProduct;
};
const getAllOrdersByUserIntoDb = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    { 'orders.productName': 1, 'orders.price': 1, 'orders.quantity': 1 },
  );
  return result;
};

const getOrdersTotalIntoDB = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return result;
};

const deleteUserIntoDB = async (id: number) => {
  const result = await User.deleteOne({ userId: id });
  return result;
};

export const userServices = {
  creatUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  updateUserIntoDB,
  updateUserOrderIntoDb,
  getAllOrdersByUserIntoDb,
  getOrdersTotalIntoDB,
};
