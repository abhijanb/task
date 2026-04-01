import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnect from "./config/dbConnect.js"
import apiRoute from "./routes/index.js"
import seed from "./seed.js"
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    methods: "*",
    origin: "*",
}))
app.get('/seed', (req, res) => { return seed().then(() => res.json({ success: true, message: "seeded successfully" })).catch((e) => res.status(500).json({ success: false, message: "seed failed", error: e })) })
app.use('/api', apiRoute)

const PORT = process.env.PORT || 3000
const startServer = async () => {
    try {
        await dbConnect()
        app.listen(PORT, () => {
            console.log("server is running on port", PORT);
        })
    }
    catch (e) {
        console.log("error occured", e)
        process.exit(1)
    }
}

startServer();

