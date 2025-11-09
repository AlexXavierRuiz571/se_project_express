const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = { _id: "5d8b8592978f8bd833ca8133" };
  next();
});
app.use("/", routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
