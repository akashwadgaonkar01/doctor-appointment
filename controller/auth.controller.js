const asyncHandler = require("express-async-handler")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/email")
const { generateOTP } = require("../utils/otp")
const { differenceInSeconds } = require('date-fns')
const Admin = require("../models/Admin")
const Doctor = require("../models/Doctor")
const Patient = require("../models/Patient")



exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, mobile } = req.body
    if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(mobile)) {
        return res.status(400).json({ message: "all fields required" })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "invalid email" })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "invalid mobile" })
    }
    await Admin.create({ name, email, mobile })
    res.json({ message: "Admin register success" })
}
)

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { userName } = req.body

    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }

    const otp = generateOTP()
    await Admin.findByIdAndUpdate(result._id, { otp, otpSendOn: Date.now() })

    await sendEmail({
        message: `<h1>Your OTP is ${otp}</h1>`,
        subject: "verify otp to login",
        to: result.email
    })
    res.json({ message: "otp send" })
})

exports.verifyAdminOTP = asyncHandler(async (req, res) => {
    const { otp, userName } = req.body

    const result = await Admin.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    if (result.otp !== otp) {
        return res.status(401).json({ message: "invalid otp" })
    }
    if (differenceInSeconds(Date.now(), result.otpSendOn) > process.env.OTP_EXPIRE) {
        await Admin.findByIdAndUpdate(result._id, { otp: null })
        return res.status(401).json({ message: "otp expire" })
    }

    await Admin.findByIdAndUpdate(result._id, { otp: null })
    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("hos-admin", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "login success",
        result: {
            name: result.name,
            email: result.email
        }
    })
})

exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("hos-admin")
    res.json({ message: "logout success" })
})



exports.loginDoctor = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const result = await Doctor.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }
    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials password" })
    }

    if (!result.isActive) {
        return res.status(401).json({ message: "account blocked by admin" })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("hos-doctor", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "doctor login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            doctorId: result._id,
            infoComplete: result.infoComplete,
        }
    })

})

exports.logoutDoctor = asyncHandler(async (req, res) => {
    res.clearCookie("hos-doctor")
    res.json({ message: "logout user success" })
})



exports.registerPatient = asyncHandler(async (req, res) => {
    const { name, email, mobile, password } = req.body
    const result = await Patient.findOne({ $or: [{ mobile }, { email }] })
    if (result) {
        return res.status(409).json({ message: "email/mobile already registered" })
    }

    const hash = await bcrypt.hash(password, 10)
    await Patient.create({ ...req.body, password: hash })
    res.json({ message: "Patient register success" })
})

exports.loginPatient = asyncHandler(async (req, res) => {
    const { userName, password } = req.body
    const result = await Patient.findOne({ $or: [{ email: userName }, { mobile: userName }] })
    console.log(result);

    if (!result) {
        return res.status(400).json({ message: "invalid credentials" })
    }

    const isVerify = await bcrypt.compare(password, result.password)
    if (!isVerify) {
        return res.status(401).json({ message: "invalid credentials password" })
    }

    if (!result.isActive) {
        return res.status(401).json({ message: "account blocked by admin" })
    }

    const token = jwt.sign({ _id: result._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("hos-patient", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    })

    res.json({
        message: "patient login success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            doctorId: result._id,
            infoComplete: result.infoComplete,
        }
    })

})

exports.logoutPatient = asyncHandler(async (req, res) => {
    res.clearCookie("hos-patient")
    res.json({ message: "logout user success" })
})