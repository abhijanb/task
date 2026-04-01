import mongoose from "mongoose"
import bcrypt, { compare } from "bcrypt"
const UserSchema = new mongoose.Schema({
    "name": {
        type: String, required: true, minLength: 4, maxLength: 50
    },
    "email": {
        type: String, required: true, minLength: 6, maxLength: 225
    },
    "password": {
        type: String, required: true, minLength: 6, maxLength: 225
    },
    "role": {
        type: String, default: "buyer"
    },
    "favoriteProperties": {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
        default: []
    }
})

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', UserSchema)
export default User;