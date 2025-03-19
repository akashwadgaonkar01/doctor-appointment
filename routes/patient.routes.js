const { getPatientDoctors, getSchedule } = require("../controller/patient.controller");

const router = require("express").Router()

router
    .get("/get-patient-doctor", getPatientDoctors)
    .get("/get-schedule", getSchedule)


module.exports = router;