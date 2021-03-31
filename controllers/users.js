const User = require('../models/user');
const {
  handleValidationError, handleCastError, handleNotFoundError, handleServerError,
} = require('../utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleServerError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) handleNotFoundError(res);
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') handleCastError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  User.create({
    email, password, name, about, avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) handleNotFoundError(res);
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') handleCastError(err, res);
      else if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) handleNotFoundError(res);
      else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') handleCastError(err, res);
      else if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};
