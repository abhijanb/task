const validationMiddleware = (validationSchema) => {
    console.log("1")
    return (req, res, next) => {
    console.log("2")
        
        const validatedData = validationSchema.safeParse(req.body)
        if (!validatedData.success) {
            const error = validatedData.error.issues.map((er) => {
                return ({
                    [er.path.join('.')]: er.message
                })
            })
            return res.status(400).json({ "success": false, error: error, message: "validation failed" })
        }
        req.body = validatedData.data
        next()
    }
}
export default validationMiddleware