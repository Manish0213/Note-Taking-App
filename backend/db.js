const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://ratnawatmanish031:85clLz6jywdTobTD@cluster0.jgqbrgk.mongodb.net/NoteTakingDB?retryWrites=true&w=majority&appName=Cluster0";
const connectToDatabse = () => {
  mongoose
    .connect(mongoUrl)
    .then(() => console.log("Connected"))
    .catch((err) => console.error("Connection error:", err));
};
module.exports = connectToDatabse;
