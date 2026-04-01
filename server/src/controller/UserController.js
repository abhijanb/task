import PropertyService from "../services/PropertyService.js";
import UserService from "../services/UserService.js";
import ResponseController from "./ResponseController.js";

class UserController {
    static async getDashboardData(req, res) {
        try {
            const userId = req.user.id;
            const [suggestedPropsResult, favoritePropsResult] = await Promise.all([
                UserService.listAllPropertiesExceptFavorites(userId),
                UserService.listFavoriteProperties(userId)
            ]);

            if (!suggestedPropsResult?.success) {
                return ResponseController.error(res, suggestedPropsResult?.message || "Failed to fetch suggested properties", 500);
            }

            const favoriteProperties = favoritePropsResult?.success ? favoritePropsResult.data : [];

            return res.status(200).json({
                success: true,
                data: {
                    suggestedProperties: suggestedPropsResult.data || [],
                    favoriteProperties: favoriteProperties,
                    user: req.user
                }
            });
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            return ResponseController.error(res, "Internal server error", 500);
        }
    }
    static async listFavoriteProperties(req, res) {
        try {
            const userId = req.user.id;
            const favorites = await UserService.listFavoriteProperties(userId);
            return ResponseController.response(res, favorites);
        } catch (error) {
            return ResponseController.error(res, "Internal server error", 500);
        }
    }

    static async addToFavorites(req, res) {
        try {
            const userId = req.user.id;
            const propertyId = req.params.propertyId;
            const property = await PropertyService.getPropertyById(propertyId);
            if (!property) {
                return ResponseController.error(res, "Property not found", 404);
            }
            const result = await UserService.addToFavorites(userId, propertyId);
            return ResponseController.response(res, result);
        } catch (error) {
            console.error("Error adding to favorites:", error);
            return ResponseController.error(res, "Internal server error", 500);
        }
    }

    static async removeFromFavorites(req, res) {
        try {
            const userId = req.user.id;
            const propertyId = req.params.propertyId;
            const result = await UserService.removeFromFavorites(userId, propertyId);
            return ResponseController.response(res, result);
        } catch (error) {
            console.error("Error removing from favorites:", error);
            return ResponseController.error(res, "Internal server error", 500);
        }
    }
}

export default UserController