const express = require("express");

const { PORT = 3001 } = process.env;
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
