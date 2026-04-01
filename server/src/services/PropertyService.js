import Property from "../model/Property.model.js";
class PropertyService {
    static async listAllProperties() {
        try {
            const properties = await Property.find();
            return { success: true, data: properties, message: "properties fetched successfully" };
        } catch (error) {
            console.error("Error fetching properties:", error);
            throw new Error("Internal server error");
        }
    }
    static async getPropertyById(propertyId) {
        try {
            const property = await Property.findById(propertyId);
            return property;
        } catch (error) {
            console.error("Error fetching property by ID:", error);
            throw new Error("Internal server error");
        }
    }
}

export default PropertyService