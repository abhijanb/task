import User from "../model/User.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
class AuthService {
    static async register(data) {
        try {
            const userExist = await User.findOne({ email: data.email })
            if (userExist) {
                return { success: false, error: "", message: "user already exist" }
            }
            const user = await User.create(data)
            if (!user) return { success: false, error: "", message: "try again" }
            const userObject = user.toObject();
            const { password, ...userWithoutPassword } = userObject
            return { success: true, data: userWithoutPassword, message: "user created successfully" }

        } catch (error) {
            return { success: false, error: error, message: "error on register" }
        }
    }
    static async login(data) {
        try {
            const userExist = await User.findOne({ email: data.email })
            if (!userExist) return { success: false, error: "", message: "user doesnot exist create account" }
            const passwordMatch = await bcrypt.compare(data.password, userExist.password)
            if (!passwordMatch) return { success: false, error: "", message: "credintals doesnot matched" }
            const accessSecret = process.env.JWT_SECRECT_ACCESS_KEY
            const refreshSecret = process.env.JWT_SECRECT_REFRESH_KEY
            if (!accessSecret) return { success: false, error: "", message: "JWT_SECRECT_ACCESS_KEY is missing in env" }
            if (data.rememberMe && !refreshSecret) return { success: false, error: "", message: "JWT_SECRECT_REFRESH_KEY is missing in env" }

            const accessToken = jwt.sign({ id: userExist._id, email: userExist.email, name: userExist.name, role: userExist.role }, accessSecret, { expiresIn: "1d" })
            if (data.rememberMe) {
                const refreshToken = jwt.sign({ id: userExist._id }, refreshSecret, { expiresIn: "7d" })
                return { success: true, data: { accessToken, refreshToken }, message: "user login success" }
            }
            return { success: true, data: { accessToken }, message: "user login success" }
        } catch (error) {
            return { success: false, error: error?.message || error, message: "error on login" }
        }
    }
}

export default AuthService