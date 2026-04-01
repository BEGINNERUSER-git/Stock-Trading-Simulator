import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId:{
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
        orderType:{
            type:String,
            enum:["buy","sell"],
            required:true,
        },
        status:{
            type:String,
            enum:["pending","completed","cancelled","partially_completed","expired"],
            default:"pending",
        }
    },
    {
        timestamps:true,
    }
);

const Order=mongoose.model("Order",orderSchema);
export default Order;