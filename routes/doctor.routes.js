const { updateDoctorInfo, getDoctorSchedule } = require("../controller/doctor.controller");

const router = require("express").Router()

router
    .post("/doctor-info-update", updateDoctorInfo)
    .get("/get-doctor-schedule", getDoctorSchedule)

module.exports = router;