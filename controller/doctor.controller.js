const Doctor = require("../models/Doctor")
const { checkEmpty } = require("../utils/checkEmpty")
const asyncHandler = require("express-async-handler")
const { doctorUpload } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary")
const Schedule = require("../models/Schedule")
const mongoose = require("mongoose")

exports.updateDoctorInfo = asyncHandler(async (req, res) => {
    doctorUpload(req, res, async (err) => {
        if (err) {
            return res.status(400)
                .json({ message: "multer error", err })
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "hero image is require" })
        }
        const { address, education, city, gender } = req.body
        const { isError, error } = checkEmpty({ address, city, gender, education })

        if (isError) {
            return res.status(400)
                .json({ message: "all felds required", error })
        }
        const image = {}
        for (const key in req.files) {
            const { secure_url, } = await cloudinary.uploader?.upload(req.files[key][0].path)
            image[key] = secure_url
        }

        await Doctor.findByIdAndUpdate(req.loggedInDoctor, { ...req.body, ...image, infoComplete: true })
        res.json({ message: "profile update success" })
    })
})

exports.getDoctorSchedule = asyncHandler(async (req, res) => {
    const { doctorId } = req.query
    const result = await Schedule.find({ doctorId: new mongoose.Types.ObjectId(doctorId) })
    res.json({ message: "get schedule data", result })
})