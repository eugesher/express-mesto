const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minlength: [2, 'Поле \'имя\' должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле \'имя\' должно содержать не более 30 символов'],
    required: false,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле \'о себе\' должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле \'о себе\' должно содержать не более 30 символов'],
    required: false,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

module.exports = mongoose.model('user', userSchema);
