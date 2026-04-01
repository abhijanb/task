import express from "express"
import authRoute from "./auth.route.js"
import propertyRoute from "./property.route.js";
import userRoute from "./userRoute.js";
const apiRoute = express();
apiRoute.use('/auth',authRoute)
apiRoute.use('/user',userRoute)
apiRoute.use('/property',propertyRoute)
export default apiRoute