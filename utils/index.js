module.exports.handleValidationError = (err, res) => {
  res.status(400).send({
    message: Object.values(err.errors)
      .map((e) => e.message)
      .join('. '),
  });
};

module.exports.handleNotFoundError = (res) => {
  res.status(404).send({ message: 'Пользователь не найден' });
};

module.exports.handleServerError = (err, res) => {
  res.status(500).send({ message: err.message });
};
