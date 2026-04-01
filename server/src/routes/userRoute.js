import UserController from "../controller/UserController.js";
import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
const userRoute = express.Router();
userRoute.get('/dashboard', authMiddleware, UserController.getDashboardData)
userRoute.get('/favorites', authMiddleware, UserController.listFavoriteProperties)
userRoute.post('/favorites/:propertyId', authMiddleware, UserController.addToFavorites)
userRoute.delete('/favorites/:propertyId', authMiddleware, UserController.removeFromFavorites)
export default userRoute