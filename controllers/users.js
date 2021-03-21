const User = require('../models/user');
const {
  handleValidationError, handleNotFoundError, handleServerError, getUserInfo,
} = require('../utils');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users.map(getUserInfo)))
    .catch((err) => handleServerError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) handleNotFoundError(res);
      else res.send(getUserInfo(user));
    })
    .catch((err) => handleServerError(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(getUserInfo(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(getUserInfo(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(getUserInfo(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') handleValidationError(err, res);
      else handleServerError(err, res);
    });
};
