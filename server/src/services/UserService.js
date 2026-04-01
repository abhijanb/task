import User from "../model/User.model.js";
import PropertyService from "./PropertyService.js";

class UserService {
    static async listFavoriteProperties(userId) {
        const user = await User.findById(userId);
        if (!user) return { success: false, error: "User not found", message: "User not found" };
        const userWithFavorites = await user.populate('favoriteProperties')
        if (!userWithFavorites.favoriteProperties) return { success: false, error: "No favorite properties found", message: "No favorite properties found" };
        return { success: true, data: userWithFavorites.favoriteProperties, message: "Favorite properties fetched successfully" };
    }
    static async listAllPropertiesExceptFavorites(userId) {
        const user = await User.findById(userId);
        if (!user) return { success: false, error: "User not found", message: "User not found" };
        const favoritePropertyIds = user.favoriteProperties.map(id => id.toString());
        const properties = await PropertyService.listAllProperties();
        if (!properties?.success) return { success: false, error: "Failed to fetch properties", message: "Failed to fetch properties" };
        const suggestedProperties = properties.data.filter(p => !favoritePropertyIds.includes(p._id.toString()));
        return { success: true, data: suggestedProperties, message: "Suggested properties fetched successfully" };
    }

    static async addToFavorites(userId, propertyId) {
        const user = await User.findById(userId);
        if (!user) return { success: false, error: "User not found", message: "User not found" };
        if (user.favoriteProperties.includes(propertyId)) {
            return { success: false, error: "Property already in favorites", message: "Property already in favorites" };
        }
        user.favoriteProperties.push(propertyId);
        await user.save();
        return { success: true, message: `Property ${propertyId} added to favorites for user ${userId}` };
    }

    static async removeFromFavorites(userId, propertyId) {
        const user = await User.findById(userId);
        if (!user) return { success: false, error: "User not found", message: "User not found" };
        if (!user.favoriteProperties.includes(propertyId)) {
            return { success: false, error: "Property not in favorites", message: "Property not in favorites" };
        }
        user.favoriteProperties = user.favoriteProperties.filter(id => id.toString() !== propertyId.toString());
        await user.save();
        return { success: true, message: `Property ${propertyId} removed from favorites for user ${userId}` };
    }
}

export default UserService