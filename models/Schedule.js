const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Types.ObjectId, ref: "doctor", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model("schedule", scheduleSchema);
