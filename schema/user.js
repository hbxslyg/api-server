const { Joi } = require("express-validation");

const username = Joi.string().alphanum().min(3).max(20).required();
const password = Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required();

exports.loginValidation = {
  body: Joi.object({
    username,
    password,
  }),
};

exports.registerValidation = {
  body: Joi.object({
    username,
    password,
    email: Joi.string().email(),
  }),
};
