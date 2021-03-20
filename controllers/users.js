const User = require('../models/user');

module.exports.getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ data: users }))
    .catch((error) => response.status(500).send({ message: error.message }));
};

module.exports.getUserById = (request, response) => {
  User.findById(request.params._id)
    .then((user) => response.send({ data: user }))
    .catch((error) => response.status(500).send({ message: error.message }));
};

module.exports.createUser = (request, response) => {
  const { name, about, avatar } = request.body;

  User.create({ name, about, avatar })
    .then((user) => response.send({ data: user }))
    .catch((error) => response.status(500).send({ message: error.message }));
};
