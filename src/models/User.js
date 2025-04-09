const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);