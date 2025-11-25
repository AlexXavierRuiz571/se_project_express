const express = require("express");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res, next) => {
  const { method, path } = req;

  if (method === "POST" && (path === "/signin" || path === "/signup")) {
    return next();
  }

  if (method === "GET" && path === "/items") {
    return next();
  }

  return auth(req, res, next);
});

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
