const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    movement: String,
    active: Number,
    lastUpdate: String,
    restInterval: Number,
    sets: [],
    user: String,
  },
  { collection: "exercises" }
);

module.exports = mongoose.model("Exercise", searchSchema);
