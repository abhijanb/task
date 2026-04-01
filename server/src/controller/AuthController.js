import AuthService from "../services/AuthService.js"
import ResponseController from "./ResponseController.js"
class AuthController {
    static async register(req, res) {
        const user = await AuthService.register(req.body)
        return ResponseController.response(res, user)
    }

    static async login(req, res) {
        const user = await AuthService.login(req.body)
        return ResponseController.response(res, user)
    }
}
export default AuthController