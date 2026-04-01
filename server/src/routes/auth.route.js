import express from "express"
import AuthController from "../controller/AuthController.js"
import validationMiddleware from "../middleware/validationMiddleware.js"
import authValidationSchema from "../validation/authValidation.schema.js"
const authRoute = express.Router()
authRoute.post('/register',validationMiddleware(authValidationSchema.registerValidationSchema) ,AuthController.register)
authRoute.post('/login', validationMiddleware(authValidationSchema.loginValidationSchema), AuthController.login)
export default authRoute