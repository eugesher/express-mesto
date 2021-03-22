module.exports.handleValidationError = (err, res) => {
  res.status(400).send({
    message: Object.values(err.errors)
      .map((e) => e.message)
      .join('. '),
  });
};

module.exports.handleCastError = (err, res) => {
  res.status(400).send({ message: 'Недопустимый идентификатор' });
};

module.exports.handleNotFoundError = (res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден.' });
};

module.exports.handleServerError = (res) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};
