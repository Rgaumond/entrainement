const express = require("express");
const port = process.env.port || 5500;
const workoutRouter = require("./routes/workout");
const exerciseRouter = require("./routes/exercise");

//Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//Router
app.use("/workouts", workoutRouter);
app.use("/exercises", exerciseRouter);

// use to handle endpoints with /customer

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});
// app.post("/",(req, res)=> {
//     console.log("ROOT");
//     res.sendFile(__dirname+"/public/name");
// });

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port ${port}`);
});
