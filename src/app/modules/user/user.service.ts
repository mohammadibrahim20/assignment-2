import { TUser } from './user.interface';
import { User } from './user.model';

const creatUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

export const userServices = {
  creatUserIntoDB,
};
