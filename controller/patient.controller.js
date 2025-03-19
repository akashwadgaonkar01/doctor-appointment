const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const asyncHandler = require("express-async-handler");

exports.getPatientDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ isActive: true });
  const doctorIds = doctors.map((doc) => doc._id);

  const schedules = await Schedule.find({ doctorId: { $in: doctorIds } }).select(
    "doctorId date startTime endTime"
  );

  const result = doctors.map((doctor) => ({
    ...doctor._doc,
    schedule: schedules.filter((schedule) =>
      schedule.doctorId.equals(doctor._id)
    ),
  }));

  res.json({ message: "Doctor fetch success", result });
});

exports.getSchedule = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ isActive: true });
  const doctorIds = doctors.map((doc) => doc._id);

  const result = await Schedule
    .find({ doctorId: { $in: doctorIds } })
    .select("doctorId date startTime endTime");

  // const result = doctors.map((doctor) => ({
  //   ...doctor._doc,
  //   schedule: schedules.filter((schedule) =>
  //     schedule.doctorId.equals(doctor._id)
  //   ),
  // }));

  res.json({ message: "schedule fetch success", result });
});
