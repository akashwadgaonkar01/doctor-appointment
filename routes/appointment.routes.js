const { bookAppointment, getPatientAppointment, getPatientCompletedAppointment, getAdminPatientAppointment, getAdminPatientCompletedAppointment, deletePatientAppointment, updatePatientAppointment, getDoctorPatientCompletedAppointment, getDoctorPatientRejectAppointment, getDoctorPatientPendingAppointment, getDoctorPatientAcceptAppointment, updateDoctorstatus } = require("../controller/appointment.controller");

const router = require("express").Router()

router
    .post("/book-appointment",bookAppointment)
    .get("/get-patient-appointment",getPatientAppointment)
    .get("/get-patient-completed-appointment",getPatientCompletedAppointment)
    
    .get("/get-admin-appointment",getAdminPatientAppointment)
    .get("/get-admin-completed-appointment",getAdminPatientCompletedAppointment)

    .get("/get-doctor-completed-appointment",getDoctorPatientCompletedAppointment)
    .get("/get-doctor-reject-appointment",getDoctorPatientRejectAppointment)
    .get("/get-doctor-pending-appointment",getDoctorPatientPendingAppointment)
    .get("/get-doctor-accept-appointment",getDoctorPatientAcceptAppointment)
    
    .delete("/delete-patient-appointment/:_id",deletePatientAppointment)
    .put("/update-patient-appointment/:_id",updatePatientAppointment)
    
    .put("/change-status/:_id",updateDoctorstatus)

module.exports = router;