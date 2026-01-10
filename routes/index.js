const express = require("express");
const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { validateCreateUser, validateLogin } = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors");

const router = express.Router();

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);

router.get("/items", getItems);

router.use(auth);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource was not found."));
});

module.exports = router;
