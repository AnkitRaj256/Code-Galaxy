import { asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js"

export const verifyJWT = asyncHandler(async(req, _ , next) => { // inplace of res we can use ' _ '
    try {
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "")
        
        if (!token) {
            throw new ApiError(401, "Unauthorized", ["Token is missing"]);
        }        
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
        
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")  
    }
})