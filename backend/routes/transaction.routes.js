import {
 getTransactions,
    getTransactionById,
    deleteTransaction
} from "../controllers/transaction.controllers.js"
import express from 'express'
import { verifyJWT } from "../middleware/auth.middleware.js";
const TransRouter=express.Router();

TransRouter.get('/:userId',verifyJWT, getTransactions);
TransRouter.get('/single/:transactionId',verifyJWT, getTransactionById);
TransRouter.get('/:userId',verifyJWT, deleteTransaction);

export default TransRouter;