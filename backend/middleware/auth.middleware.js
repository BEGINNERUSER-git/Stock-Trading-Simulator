import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

export const verifyJWT = async (req, res, next) => {
    try {
        if (req.method === 'OPTIONS') {
        return next();
    }
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
        
        if (!token) {
            // Instead of throwing, you can also do: return next(new ApiError(401, "Unauthorized Access"))
            throw new ApiError(401, "Unauthorized Access");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next(); // Success: Move to the controller

    } catch (error) {
        next(new ApiError(401, error?.message || "Invalid access token"));
    }
};