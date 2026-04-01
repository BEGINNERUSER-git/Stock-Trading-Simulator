import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
    {
        symbol:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        name:{
            type:String,
            required:true,
            trim:true,
        },
    },
    {
        timestamps:true,
    }
);

const Stock=mongoose.model("Stock",stockSchema);
export default Stock;