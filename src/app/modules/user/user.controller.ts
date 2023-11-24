import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserIntoDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User data not found',
      error: {
        code: 404,
        description: 'User data not found!',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const result = await userServices.getSingleUserIntoDB(id);
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const result = await userServices.deleteUserIntoDB(id);

    res.status(200).json({
      success: `${result.deletedCount ? true : false}`,
      message: `${
        result.deletedCount ? 'User deleted successfully!' : "'User not found"
      }`,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      data: null,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const zodValidationData = userValidationSchema.parse(user);
    const result = await userServices.creatUserIntoDB(zodValidationData);
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    const message = 'user creation failed';

    res.status(500).json({
      success: false,
      message: error || message,
      code: 500,
      description: 'user creation failed',
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
};
