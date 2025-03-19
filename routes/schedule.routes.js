const { deleteDoctorSchedule, addDoctorSchedule, updateDoctorSchedule } = require("../controller/schedule.controller");

const router = require("express").Router()

router
    .post("/doctor-schedule-add", addDoctorSchedule)
    .delete("/doctor-schedule-delete/:_id", deleteDoctorSchedule)
    .put("/doctor-schedule-update/:_id", updateDoctorSchedule)

module.exports = router;