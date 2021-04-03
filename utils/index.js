module.exports.handleValidationError = (err, res) => {
  res.status(400).send({
    message: Object.values(err.errors)
      .map((e) => e.message)
      .join('. '),
  });
};

module.exports.isURL = (string) => {
  const regex = /(https|http):\/\/(www\.)?[\w-]+(\.[\w]+)+([\w\-.+()[\]~:/?#@!$&*,;='])+/;
  return regex.test(string);
};
