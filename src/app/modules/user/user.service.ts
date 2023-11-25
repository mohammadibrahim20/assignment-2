import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// create a new user in the database
const creatUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
// get all users from database
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
// get single user from database
const getSingleUserIntoDB = async (id: number) => {
  const result = await User.find({ userId: id }).select(
    '-password -orders -_id',
  );
  return result;
};
//update user
const updateUserIntoDB = async (updateData: TUser, userId: number) => {
  const result = await User.updateOne({ userId }, { $set: { ...updateData } });
  return result;
};
// update order user by id
const updateUserOrderIntoDb = async (userId: number, orderData: TOrder) => {
  const newProduct = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { returnOriginal: false },
  ).select('orders -_id');
  return newProduct;
};

// get all orders bu user id
const getAllOrdersByUserIntoDb = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    { 'orders.productName': 1, 'orders.price': 1, 'orders.quantity': 1 },
  );
  return result;
};
// get order total calculate mondodb in aggregated methods
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
// delete user in db
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
