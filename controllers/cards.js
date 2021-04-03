const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');
const { concatenateErrors } = require('../utils');

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
      if (err.name === 'ValidationError') next(new BadRequestError(concatenateErrors(err)));
      else next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки не существует');
      else if (!card.owner.equals(req.user._id)) throw new ForbiddenError('Можно удалять только свои карточки');
      else {
        Card.findByIdAndRemove(cardId).then((removedCard) => {
          res.send(removedCard);
        });
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор карточки'));
      else next(err);
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
      else next(err);
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
      else next(err);
    });
};
