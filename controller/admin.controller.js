const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs");
const Doctor = require("../models/Doctor")
const Patient = require("../models/Patient")
const { sendEmail } = require("../utils/email")

exports.registerDoctor = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body
    const result = await Doctor.findOne({
        $or: [
            { mobile },
            { email }
        ]
    })
    if (result) {
        return res.status(409).json({ message: "email/mobile already registered" })
    }
    const password = "dr" + name.slice(0, 2)
    const hash = await bcrypt.hash(password, 10)
    await Doctor.create({ ...req.body, password: hash })
    await sendEmail({
        message: `<h1>your password is ${password}</h1>`,
        subject: "verify password to login",
        to: email
    })
    res.json({ message: "Doctor register success" })
})

exports.getAdminDoctor = asyncHandler(async (req, res) => {
    const result = await Doctor.find()
    res.json({ message: "doctor fetch success", result })
})

exports.getAdminPatient = asyncHandler(async (req, res) => {
    const result = await Patient.find()
    res.json({ message: "doctor fetch success", result })
})


exports.adminBlockUnblockDoctor = asyncHandler(async (req, res) => {
    const { aid } = req.params
    await Doctor.findByIdAndUpdate(aid, { isActive: req.body.isActive }, { new: true })
    res.json({ message: "Doctor's account block success" })
})

exports.adminBlockUnblockPatient = asyncHandler(async (req, res) => {
    const { aid } = req.params
    await Patient.findByIdAndUpdate(aid, { isActive: req.body.isActive }, { new: true })
    res.json({ message: "Patient's account block success" })
})