const express = require("express");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { NOT_FOUND } = require("../utils/errors");

const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", login);

router.get("/items", getItems);

router.use(auth);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
