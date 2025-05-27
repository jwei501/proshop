import express from 'express';
const router = express.Router();

import { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; //import the protect and admin middleware functions


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders); //create a new order and get all orders
router.route('/mine').get(protect, getMyOrders); //get logged in user orders
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered); //get order by id, update order to paid and update order to delivered

export default router;