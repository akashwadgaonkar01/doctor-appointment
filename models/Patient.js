const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },

    address: { type: String },
    city: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    isActive: { type: Boolean, default: true },
    infoComplete: { type: Boolean, default: false, },
}, { timestamps: true })

module.exports = mongoose.model("patient", patientSchema)