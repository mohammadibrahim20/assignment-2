import { Request, Response } from 'express';
import { User } from './user.model';
import { userServices } from './user.service';
import { userValidationSchema } from './user.validation';

// get all users
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

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const user = await User.isUserExists(id);
    if (!user) {
      throw new Error('User not found');
    } else {
      const result = await userServices.getSingleUserIntoDB(id);
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    }
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

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);
    const body = req.body;
    if (body.password) {
      return res.status(404).json({
        success: false,
        message: 'Password field not changeable',
        error: {
          code: 404,
          description: 'Password field not changeable',
        },
      });
    }
    const result = await userServices.updateUserIntoDB(body, id);

    res.status(200).json({
      success: `${result.matchedCount ? true : false}`,
      message: `${
        result.matchedCount ? 'User updated successfully!' : "'User not found"
      }`,
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

// delete user by id
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

// create a new user
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

    res.status(404).json({
      success: false,
      message: error || message,
      code: 404,
      description: 'user creation failed',
    });
  }
};

// add and update user orders
const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const user = await User.isUserExists(id);
    if (user) {
      const body = req.body;
      const result = await userServices.updateUserOrderIntoDb(id, body);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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

// get all orders by user id
const getAllOrdersByUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const user = await User.isUserExists(id);
    if (user) {
      const result = await userServices.getAllOrdersByUserIntoDb(id);
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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

// get all orders total
const getOrdersTotal = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.userId);

    const user = await User.isUserExists(id);
    if (user) {
      const result = await userServices.getOrdersTotalIntoDB(id);
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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
export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  updateOrder,
  getAllOrdersByUser,
  getOrdersTotal,
};
