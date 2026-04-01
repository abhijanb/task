import mongoose from "mongoose"
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Db connection successful")
    }
    catch (e) {
        console.log("db connection error occured", e)
        process.exit(1)
    }
}
export default dbConnect