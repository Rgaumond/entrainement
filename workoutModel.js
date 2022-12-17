const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    active: Number,
    lastUpdate: String,
    completed: Number,
    completedDate: String,
    exercises: [],
    user: String,
  },
  { collection: "workouts" }
);

module.exports = mongoose.model("Workout", searchSchema);
