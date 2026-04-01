import express from "express";
import PropertyController from "../controller/PropertyController.js";
const propertyRoute = express.Router();
propertyRoute.get('/', PropertyController.listAllProperties)
export default propertyRoute