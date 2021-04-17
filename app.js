require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { validateLoginCredentials } = require('./middlewares/validations');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const router = require('./routes');
const errorHandler = require('./errors/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateLoginCredentials, login);
app.post('/signup', validateLoginCredentials, createUser);
app.use(auth);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
