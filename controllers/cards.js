const Card = require('../models/card');
const {
  handleValidationError, handleNotFoundError, handleServerError, getCardInfo,
} = require('../utils');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards.map(getCardInfo)))
    .catch((err) => handleServerError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(getCardInfo(card)))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) handleNotFoundError(res);
      else res.send(getCardInfo(card));
    })
    .catch((err) => handleServerError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) handleNotFoundError(res);
      else res.send(getCardInfo(card));
    })
    .catch((err) => handleServerError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) handleNotFoundError(res);
      else res.send(getCardInfo(card));
    })
    .catch((err) => handleServerError(err, res));
};
