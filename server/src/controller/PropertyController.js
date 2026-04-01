import PropertyService from "../services/PropertyService.js";
import ResponseController from "./ResponseController.js";

class PropertyController {
    static async listAllProperties(req, res) {
        try {
            const properties = await PropertyService.listAllProperties();
            return ResponseController.response(res, properties);
        } catch (error) {
            console.error("Error fetching properties:", error);
            return ResponseController.error(res, "Internal server error", 500);
        }
    }
}
export default PropertyController