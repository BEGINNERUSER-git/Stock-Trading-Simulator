import { Transaction } from "../models/transaction.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


export const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params;

        // Get the user's transactions
        const transactions = await Transaction.find({ 
            $or:[
                {
                    buyerId:userId
                },
                {
                    sellerId:userId
                }
            ]
         }).sort({createdAt:-1});
         console.log(transactions)
        res.status(200).json(new ApiResponse(true, "Transactions retrieved successfully", transactions));
    } catch (error) {
        throw new ApiError(500,"Getting transaction failed");
    }
};  

export const getTransactionById = async (req, res) => {
    try {
        const { transactionId } = req.params;

        // Get the transaction by ID
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        res.status(200).json(new ApiResponse(true, "Transaction retrieved successfully", transaction));
    } catch (error) {
         throw new ApiError(500,"Getting Transaction by Id failed");
    
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { transactionId } = req.params;

        // Delete the transaction by ID
        const transaction = await Transaction.findByIdAndDelete(transactionId);
        if (!transaction) {
            throw new ApiError(404, "Transaction not found");
        }
        res.status(200).json(new ApiResponse(true, "Transaction deleted successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json(new ApiResponse(false, error.message));
    }
};  


