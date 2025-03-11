const { registerDoctor, getAdminDoctor, getAdminPatient, adminBlockUnblockDoctor, adminBlockUnblockPatient } = require("../controller/admin.controller");

const router = require("express").Router()

router
    .post("/register-doctor", registerDoctor)

    .get("/get-admin-doctor", getAdminDoctor)
    .get("/get-admin-patient", getAdminPatient)

    .put("/update-admin-doctor/:aid", adminBlockUnblockDoctor)
    .put("/update-admin-patient/:aid", adminBlockUnblockPatient)


module.exports = router;