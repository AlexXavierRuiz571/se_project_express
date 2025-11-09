const express = require("express");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { NOT_FOUND } = require("../utils/errors");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
