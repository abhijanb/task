import jwt from "jsonwebtoken"
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).json({ success: false, message: "authorization header missing" })
    const token = authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ success: false, message: "token missing" })
    const decoded = jwt.verify(token, process.env.JWT_SECRECT_ACCESS_KEY)
    if (!decoded) return res.status(401).json({ success: false, message: "invalid token" })
    req.token = token
    req.user = decoded
    next()
}
export default authMiddleware