import { TUser } from './user.interface';
import { User } from './user.model';

const creatUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};
const getAllUserIntoDB = async () => {
  const result = await User.find({});
  return result;
};
const getSingleUserIntoDB = async (id: number) => {
  const result = await User.find({ userId: id });
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
};
