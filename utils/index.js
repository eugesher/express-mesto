module.exports.handleValidationError = (err, res) => {
  res.status(400).send({
    message: Object.values(err.errors)
      .map((e) => e.message)
      .join('. '),
  });
};

module.exports.handleNotFoundError = (res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден.' });
};

module.exports.handleServerError = (res) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
};

module.exports.getUserInfo = (user) => ({
  _id: user.id,
  name: user.name,
  about: user.about,
  avatar: user.avatar,
});

module.exports.getCardInfo = (card) => ({
  likes: card.likes,
  createdAt: card.createdAt,
  _id: card._id,
  name: card.name,
  link: card.link,
  owner: card.owner,
});
