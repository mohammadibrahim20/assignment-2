import { Request, Response } from 'express';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';

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
};
