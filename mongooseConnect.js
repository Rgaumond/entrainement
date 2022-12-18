const mongoose = require("mongoose");
const connection =
  "mongodb+srv://rgaumond:Qk%40qMiJ9TAV%40cv4@cluster0.djc2jgg.mongodb.net/Entrainement";
//"mongodb://localhost:27017/Entrainement";
//Db connection
mongoose.connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", function (error) {
  z;
  return console.log(error);
});
db.once("open", () => {
  console.log("Connected to DB");
});

module.exports = mongoose.connection;
