import { Transaction } from "../models/transaction.models.js";

export async function createTransaction(trade){
    const transaction=await Transaction.create({
        buyerId: trade.buyerId,
        sellerId: trade.sellerId,
        stockSymbol: trade.stockSymbol,
        quantity: trade.quantity,
        price: trade.price,
        
    });
    return transaction;
}