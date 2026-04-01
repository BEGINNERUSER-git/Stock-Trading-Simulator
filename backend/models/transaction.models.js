import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        buyerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
            sellerId:{  
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        stockSymbol:{
            type:String,
            required:true,
            trim:true,
        },
        quantity:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        
    },
    {
        timestamps:true,
    }
);

export const Transaction = mongoose.model("Transaction",transactionSchema);
