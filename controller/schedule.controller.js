const asyncHandler = require("express-async-handler");
const Schedule = require("../models/Schedule");
const mongoose = require("mongoose");

exports.addDoctorSchedule = asyncHandler(async (req, res) => {
    const { doctorId, day, date, startTime, endTime } = req.body;

    if (!doctorId || !day || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
    }
    await Schedule.create({
        doctorId,
        day,
        date,
        startTime,
        endTime
    });

    res.status(200).json({ message: "Schedule added successfully" });
});

exports.updateDoctorSchedule = asyncHandler(async (req, res) => {
    console.log(req.body);
    await Schedule.findByIdAndUpdate(
        req.params._id,
        { ...req.body },
    );

    res.json({ message: "Schedule updated successfully" });
});

exports.deleteDoctorSchedule = asyncHandler(async (req, res) => {
    await Schedule.findByIdAndDelete(req.params._id)
    res.json({ meassage: "delete Product success" })
})


