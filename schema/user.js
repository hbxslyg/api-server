const { Joi } = require("express-validation");

const username = Joi.string().alphanum().min(3).max(20).required();
const password = Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required();

exports.loginSchema = {
  body: Joi.object({
    username,
    password,
  }),
};

exports.registerSchema = {
  body: Joi.object({
    username,
    password,
    email: Joi.string().email(),
  }),
};

exports.getUserInfoSchema = {
  body: Joi.object({
    id: Joi.number().required()
  })
}

exports.updateUserInfoSchema = {
  body: Joi.object({
    id: Joi.number().required(),
    nickname: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    avatar: Joi.string().hostname()
  })
}

exports.updatePasswordSchema = {
  body: Joi.object({
    password,
    newPassword: password
  })
}
