const { Joi } = require('express-validation')

exports.addCategorizeSchema = {
  body: Joi.object({
    name: Joi.string()
  })
}