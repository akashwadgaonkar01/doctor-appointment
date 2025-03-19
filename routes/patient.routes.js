const { getPatientDoctors } = require("../controller/patient.controller");

const router = require("express").Router()

router
    .get("/get-patient-doctor", getPatientDoctors)

module.exports = router;