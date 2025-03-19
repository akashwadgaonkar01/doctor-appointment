const asyncHandler = require("express-async-handler");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

exports.bookAppointment = asyncHandler(async (req, res) => {
    await Appointment.create({
        patientId: req.loggedInPatient,
        doctorId: req.body.doctorId,
        day: req.body.day,
        date: req.body.date,
        timeSlot: req.body.timeSlot,
        reason: req.body.reason,
    })
    res.json({ message: "book appointment success" })
})

exports.getPatientAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            patientId: req.loggedInPatient,
            status: { $in: ["pending", "accepted", "rejected"] }
        })
        .populate({
            path: "doctorId",
            select: "name email mobile address"
        });
    res.json({ message: "appointment get success", result })
})

exports.getPatientCompletedAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            patientId: req.loggedInPatient,
            status: "completed"
        })
        .populate({
            path: "doctorId",
            select: "name email mobile address"
        });
    res.json({ message: "appointment get success", result })
})

exports.getAdminPatientAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find()
        .populate({
            path: "doctorId",
            select: "name email mobile address"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "admin appointment get success", result })
})

exports.getAdminPatientCompletedAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({ status: "completed" })
        .populate({
            path: "doctorId",
            select: "name email mobile address"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "admin appointment get success", result })
})

exports.updatePatientAppointment = asyncHandler(async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params._id, { ...req.body, status: "pending" })
    res.json({ meassage: "update appointment success" })
})

exports.deletePatientAppointment = asyncHandler(async (req, res) => {
    await Appointment.findByIdAndDelete(req.params._id)
    res.json({ meassage: "delete appointment success" })
})

exports.getDoctorPatientAllAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({ doctorId: req.loggedInDoctor, })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "doctor appointment get success", result })
})

exports.getDoctorPatientCompletedAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            doctorId: req.loggedInDoctor,
            status: "completed"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "doctor appointment get success", result })
})

exports.getDoctorPatientRejectAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            doctorId: req.loggedInDoctor,
            status: "rejected"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "doctor appointment get success", result })
})

exports.getDoctorPatientPendingAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            doctorId: req.loggedInDoctor,
            status: "pending"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "doctor appointment get success", result })
})

exports.getDoctorPatientAcceptAppointment = asyncHandler(async (req, res) => {
    const result = await Appointment
        .find({
            doctorId: req.loggedInDoctor,
            status: "accepted"
        })
        .populate({
            path: "patientId",
            select: "name email mobile"
        });
    res.json({ message: "doctor appointment get success", result })
})

exports.updateDoctorstatus = asyncHandler(async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params._id, { status: req.body.status })
    res.json({ message: "doctor status change success" })
})
