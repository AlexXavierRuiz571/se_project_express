const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItems");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      console.error(err);
      return next(err);
    });
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data."));
      }

      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return next(new ForbiddenError("Forbidden."));
      }

      return ClothingItem.findByIdAndDelete(itemId).then(() =>
        res.send({ message: "Item deleted." })
      );
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError("Invalid item ID."));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found."));
      }

      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found."));
      }

      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError("Invalid data."));
      }

      return next(err);
    });
};

module.exports.dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found."));
      }

      if (
        err instanceof mongoose.Error.CastError ||
        err.name === "ValidationError"
      ) {
        return next(new BadRequestError("Invalid data."));
      }

      return next(err);
    });
};
