import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        }, 
        password:{
            type:String,    
            required:true,
            trim:true,
        },
       
        refreshToken:{
            type:String,
            default:null
        },
        balance:{
            type:Number,
            default:10000
        },

    },
    {
        timestamps:true,
    }
);







userSchema.pre("save", async function () {
  if (!this.isModified("password")) {return;}
  this.password = await bcrypt.hash(this.password, 8);
  
});

userSchema.methods.isPasswordCorrect=async function(password){
 return await bcrypt.compare(password,this.password );
}

//GENERATE ACCESS TOKEN
userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
      {
        _id:this._id,
        username:this.username

      },
      process.env.ACCESS_TOKEN_SECRET,

      {
   
        expiresIn:process.env.ACCESS_TOKEN_EXPIRATION

      }
    )
}

//GENERATE REFRESH TOKEN
userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
      {
        _id:this._id,
      
      },
      process.env.REFRESH_TOKEN_SECRET,

      {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRATION
      }
    )
}

const User = mongoose.model("User", userSchema);
export default User;