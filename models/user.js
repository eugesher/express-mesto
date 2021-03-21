const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Поле \'имя\' должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле \'имя\' должно содержать не более 30 символов'],
    required: [true, 'Поле \'имя\' не может быть пустым'],
  },
  about: {
    type: String,
    minlength: [2, 'Поле \'о себе\' должно содержать не менее 2 символов'],
    maxlength: [30, 'Поле \'о себе\' должно содержать не более 30 символов'],
    required: [true, 'Поле \'о себе\' не может быть пустым'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле \'аватар\' не может быть пустым'],
  },
});

module.exports = mongoose.model('user', userSchema);
