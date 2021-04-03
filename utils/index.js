module.exports.isURL = (string) => {
  const regex = /(https|http):\/\/(www\.)?[\w-]+(\.[\w]+)+([\w\-.+()[\]~:/?#@!$&*,;='])+/;
  return regex.test(string);
};
