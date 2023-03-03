const { Joi } = require('express-validation')

exports.addArticleSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categorize_id: Joi.number().required()
  })
}