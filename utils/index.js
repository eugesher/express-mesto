module.exports.handleValidationError = (err, res) => {
  res.status(400).send({
    message: Object.values(err.errors)
      .map((e) => e.message)
      .join('. '),
  });
};
