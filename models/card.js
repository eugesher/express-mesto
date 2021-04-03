const mongoose = require('mongoose');

const { isURL } = require('../utils');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле \'имя\' должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле \'имя\' должно содержать не более 30 символов'],
    required: [true, 'Поле \'имя\' не может быть пустым'],
  },
  link: {
    type: String,
    required: [true, 'Поле \'ссылка\' не может быть пустым'],
    validate: [isURL, 'Поле \'ссылка\' должно содержать ссылку'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
