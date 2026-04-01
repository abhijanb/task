class ResponseController {
    static async response(res, response) {
        if (response.success) return res.status(response.status || 200).json(response)
        return res.status(response.status || 500).json(response)
    }
    static async error(res, message, status = 500) {
        return res.status(status).json({ success: false, message })
    }
}
export default ResponseController