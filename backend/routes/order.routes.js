import {
    createOrder,
    modifyOrder,
    cancelOrder,
    getOrders
} from "../controllers/order.controllers.js"
import express from 'express'
import { verifyJWT } from "../middleware/auth.middleware.js";
const OrderRouter=express.Router();

OrderRouter.post('/place',verifyJWT, createOrder);
OrderRouter.post('/modify',verifyJWT, modifyOrder);
OrderRouter.patch('/cancel/:orderId',verifyJWT, cancelOrder);
OrderRouter.get('/history/:userId',verifyJWT, getOrders);

export default OrderRouter;