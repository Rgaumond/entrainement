// routes/things.js routing file
"use strict";
const express = require("express");
let router = express.Router();
const db = require("../mongooseConnect");
//End points
const Workout = require("../workoutModel");

// LIST
router.route("/").post(async (req, res) => {
  let workouts = await Workout.find({ user: req.body.user }).exec();
  res.send({ workouts });
});

// VIEW CUSTOMER VIA ID
router.route("/view/:workoutid").post(async (req, res) => {
  let payload = req.body.id;
  let workout = await Workout.findOne({ _id: payload });
  res.send({ workout });
});

// ADD WORKOUT
router.route("/add").post(async (req, res) => {
  let newWorkout = new Workout(req.body);
  let newID = Math.floor(+new Date());
  newWorkout._id = newID;
  await newWorkout.save(function (err) {
    if (err) return console.error(err);
  });
  res.send({ newWorkout });
});

//UPDATE
router.route("/update").post(async (req, res) => {
  let payload = req.body;
  let id = payload._id;
  delete payload._id;
  await Workout.updateOne({ _id: id }, payload, function (err) {
    if (err) return console.error(err);
  });
  res.send("done");
});

// DELETE
router.route("/delete").post(async (req, res) => {
  let payload = req.body.obj._id;
  await Workout.deleteOne({ _id: payload })
    .then(function () {
      res.send("deleted");
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

// FIND
router.route("/find").post(async (req, res) => {
  //var regexpName = new RegExp("^"+req.body.name,"i" );
  var regexpName = new RegExp(req.body.name, "i");
  let workouts = await Workout.find({ name: regexpName });
  res.send({ workouts });
});

module.exports = router;
