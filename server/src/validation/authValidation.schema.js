import { z } from "zod"
const loginValidationSchema = z.object({
    "email": z.email().min(6),
    "password": z.string().min(6),
    "rememberMe": z.boolean().nullable().optional()
})
const registerValidationSchema = z.object({
    "email": z.email().min(6),
    "password": z.string().min(6),
    "name": z.string().min(6)
})
export default { loginValidationSchema,registerValidationSchema }