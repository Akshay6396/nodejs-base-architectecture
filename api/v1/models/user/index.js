var Joi = require("joi");

module.exports.Login = {
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .min(2)
    .max(50)
};