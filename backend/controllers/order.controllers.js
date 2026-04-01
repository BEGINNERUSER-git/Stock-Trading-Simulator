import Order from "../models/order.models.js";
import User from "../models/user.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendOrderToEngine } from "../services/engine.services.js";
import { createTransaction } from "../services/transaction.services.js";
import { updatePortfolioUser } from "../services/portfolio.services.js";

export const createOrder = async (req, res, next) => {
    try {
        const { userId, stockSymbol, quantity, price, transactionType } = req.body;
        if (!transactionType) {
            throw new ApiError(400, "transactionType (BUY/SELL) is required");
        }
        const orderRecord = await Order.create({
            userId, stockSymbol, quantity, price,
            orderType: transactionType.toLowerCase(),
            status: "pending"
        });

const message = `${transactionType.toUpperCase()} ${stockSymbol} ${price} ${quantity} ${userId} ${orderRecord._id}`;
        // 2. Communicate with C++ Engine
       const trades = await sendOrderToEngine(message);
        let totalFilled = 0;

        if (trades && trades.length > 0) {
            for (const trade of trades) {
                totalFilled += trade.quantity;
                await createTransaction({
                    buyerId: trade.buyerId,
                    sellerId: trade.sellerId,
                    stockSymbol: trade.symbol,
                    quantity: trade.quantity,
                    price: trade.price,
                    
                }); 
                await updatePortfolioUser(
                    trade.buyerId, trade.sellerId, 
                    trade.quantity, trade.price, trade.symbol
                );
            }

            // 3. Status Logic
            if (totalFilled == quantity) {
                orderRecord.status = "completed";
            } else if (totalFilled > 0) {
                orderRecord.status = "partially_completed";
            }

            await orderRecord.save();
        }
        console.log("Order processed with trades:", trades);

        return res.status(201).json(new ApiResponse(201, "Order Processed", orderRecord));
    } catch (error) {
       console.log(error)
        next(new ApiError(500, error.message || "Order Creation failed"));
    }
};



export const getOrders = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) throw new ApiError(404, "User not found");

        const orders = await Order.find({ userId });
        return res.status(200).json(new ApiResponse(200, "Orders fetched successfully", orders));
    } catch (error) {
        next(new ApiError(500, error.message || "Failed to fetch orders"));
    }
};

export const modifyOrder = async (req, res, next) => {
    try {
        const { orderId, newPrice, newQuantity } = req.body;
        const order = await Order.findById(orderId);

        if (!order) throw new ApiError(404, "Order not found");
        if (order.status === "completed") throw new ApiError(400, "Cannot modify filled order");

        // Cancel in Engine
        await sendOrderToEngine(`CANCEL ${orderId}`);
        order.status = "cancelled";
        await order.save();

        // Create new in Engine
        const message = `${order.orderType.toUpperCase()} ${order.stockSymbol} ${newPrice} ${newQuantity} ${order.userId}`;
        await sendOrderToEngine(message);

        const newOrder = await Order.create({
            userId: order.userId,
            stockSymbol: order.stockSymbol,
            quantity: newQuantity,
            price: newPrice,
            orderType: order.orderType
        });

        return res.status(200).json(new ApiResponse(200, "Order modified successfully", newOrder));
    } catch (error) {
        next(new ApiError(500, error.message || "Failed to modify order"));
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) throw new ApiError(404, "Order not found");
        if (order.status === "completed") throw new ApiError(400, "Cannot cancel filled order");

        await sendOrderToEngine(`CANCEL ${orderId}`);
        order.status = "cancelled";
        await order.save();
        
        return res.status(200).json(new ApiResponse(200, "Order cancelled successfully", order));
    } catch (error) {
        next(new ApiError(500, error.message || "Failed to cancel order"));
    }
};