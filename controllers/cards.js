const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  handleValidationError,
} = require('../utils');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки не существует');
      else if (!card.owner.equals(req.user._id)) throw new ForbiddenError('Можно удалять только свои карточки');
      else res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор карточки'));
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки не существует');
      else res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор карточки'));
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки не существует');
      else res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор карточки'));
      next(err);
    });
};
