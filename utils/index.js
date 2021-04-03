module.exports.concatenateErrors = (err) => Object.values(err.errors).map((e) => e.message).join('. ');

module.exports.linkPattern = /(https|http):\/\/(www\.)?[\w-]+(\.[\w]+)+([\w\-.+()[\]~:/?#@!$&*,;='])+/;
