import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();
// all routes for crud operations
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.put('/:userId/orders', UserControllers.updateOrder);
router.get('/:userId/orders', UserControllers.getAllOrdersByUser);
router.get('/:userId/orders/total-price', UserControllers.getOrdersTotal);

export const UserRoutes = router;
