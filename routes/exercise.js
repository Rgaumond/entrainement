// routes/things.js routing file
"use strict";

const express = require("express");
let router = express.Router();

const db = require("../mongooseConnect");
//End points
const Exercise = require("../exerciseModel");

// LIST
router.route("/").post(async (req, res) => {
  let exercises = await Exercise.find({ user: req.body.user }).exec();
  res.send({ exercises });
});

// VIEW CUSTOMER VIA ID
// router
// .route("/view/:customerid")
// .post(async (req,res)=>{
//     let payload = req.body.id;
//     let customer = await Customer.findOne({_id:payload});
//     res.send({customer});
//   });

// ADD CUSTOMER
router.route("/add").post(async (req, res) => {
  let newExercise = new Exercise(req.body);
  let newID = Math.floor(+new Date());
  newExercise._id = newID;
  await newExercise.save(function (err) {
    if (err) return console.error(err);
  });
  res.send({ newExercise });
});

//UPDATE
router.route("/update").post(async (req, res) => {
  let payload = req.body;
  let id = payload._id;
  delete payload._id;

  await Exercise.updateOne({ _id: id }, payload)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

// DELETE
router.route("/delete").post(async (req, res) => {
  let payload = req.body.obj._id;
  await Exercise.deleteOne({ _id: payload })
    .then(function () {
      res.send("deleted");
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
});

// FIND
// router
// .route("/find")
// .post( async (req,res)=>{
//     //var regexpName = new RegExp("^"+req.body.name,"i" );
//     var regexpName = new RegExp(req.body.name,"i" );
//     let customers =await Customer.find({name:regexpName});
//     res.send({customers});
// });

module.exports = router;
