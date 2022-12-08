import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: {
            type: Number
        },
        Admin: {
            type: Number
        }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
})

export default mongoose.model("User", userSchema);