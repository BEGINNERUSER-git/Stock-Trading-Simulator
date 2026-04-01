import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        stocks:[
            {
                stockSymbol:{
                    type:String,
                    required:true,
                    trim:true,
                },
                quantity:{
                    type:Number,
                    required:true,
                },
                averagePrice:{
                    type:Number,
                    required:true,
                }
            }
        ]
    },
    {
        timestamps:true,
    }
);

const Portfolio=mongoose.model("Portfolio",portfolioSchema);
export default Portfolio;