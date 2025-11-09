const express = require("express");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Non-existent route handler
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
