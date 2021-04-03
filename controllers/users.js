const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователя не существует');
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор пользователя'));
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователя не существует');
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор пользователя'));
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователя не существует');
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор пользователя'));
      else if (err.name === 'ValidationError') next(new BadRequestError(err));
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) throw new NotFoundError('Пользователя не существует');
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') next(new BadRequestError('Недопустимый идентификатор пользователя'));
      else if (err.name === 'ValidationError') next(new BadRequestError(err));
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, '148c8eedbca406c0', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  return new Promise(() => {
    if (!email || !password) throw new BadRequestError('Не заполнены обязательные поля');
    bcrypt
      .hash(password, 8)
      .then((hash) => User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      }))
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.code === 11000) next(new ConflictError('Пользователь с таким email уже существует.'));
        else if (err.name === 'ValidationError') next(new BadRequestError(err));
        next(err);
      });
  }).catch(next);
};
