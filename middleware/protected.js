const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const Doctor = require("../models/Doctor")
const Patient = require("../models/Patient")

exports.adminProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies["hos-admin"]
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }
        next()
    })
})

exports.doctorProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies["hos-doctor"]
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }

        const result = await Doctor.findById(decode._id)
        if (!result.isActive) {
            return res.status(401).json({ message: "account blocked by admin" })
        }

        req.loggedInDoctor = decode._id
        next()
    })
})

exports.patientProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies["hos-patient"]
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token" })
        }

        const result = await Patient.findById(decode._id)
        if (!result.isActive) {
            return res.status(401).json({ message: "account blocked by admin" })
        }

        req.loggedInPatient = decode._id
        next()
    })
})

