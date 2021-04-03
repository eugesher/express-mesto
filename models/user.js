const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { isURL } = require('../utils');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле \'email\' не может быть пустым'],
    unique: true,
    validate: [validator.isEmail, 'Недопустимый email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
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
    validate: [isURL, 'Поле \'аватар\' должно содержать ссылку'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
