const { celebrate, Joi } = require('celebrate');

const { linkPattern } = require('../utils');

module.exports.validateLoginCredentials = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignupRequest = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkPattern),
  }),
});

module.exports.validateRequestHeaders = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
});

module.exports.validateGetUserByIdRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});

module.exports.validateUpdateUserInfoRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateUpdateUserAvatarRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(linkPattern),
  }),
});

module.exports.validateCreateCardRequest = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkPattern),
  }),
});

module.exports.validateCardId = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24),
  }),
});
