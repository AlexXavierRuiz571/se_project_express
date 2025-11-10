const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");
const { BAD_REQUEST, NOT_FOUND, DEFAULT_ERROR } = require("../utils/errors");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      res
        .status(DEFAULT_ERROR)
        .send({ message: "A server error has occurred." });
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data." });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "A server error has occurred." });
    });
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then(() => {
      res.send({ message: "Item deleted." });
    })
    .catch((err) => {
      console.error(err);

      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "A server error has occurred." });
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "A server error has occurred." });
    });
};

module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res.send(item);
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
      }
      return res
        .status(DEFAULT_ERROR)
        .send({ message: "A server error has occurred." });
    });
};
