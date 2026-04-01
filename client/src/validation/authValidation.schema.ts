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
export type loginType = z.infer<typeof loginValidationSchema>
export type registerType = z.infer<typeof registerValidationSchema>
export default { loginValidationSchema,registerValidationSchema }