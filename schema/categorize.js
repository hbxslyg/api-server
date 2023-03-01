const { Joi } = require('express-validation')

const name = Joi.string().pattern(/^[\u4e00-\u9fa5A-Za-z0-9-_]{1,20}$/)

exports.addCategorizeSchema = {
  body: Joi.object({
    name: name.required(),
    alias: name.required()
  })
}

exports.getCategorizeSchema = {
  body: Joi.object({
    id: Joi.number()
  })
}

exports.updateCategorizeSchema = {
  body: Joi.object({
    id: Joi.number().required(),
    name: name,
    alias: name,
    status: Joi.number().min(0).max(1)
  }).min(2)
}