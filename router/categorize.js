const express = require('express')
const { validate } = require('express-validation')
const router = express.Router()

const categorizeHandler = require('../router-handler/categorize')
const { addCategorizeSchema } = require('../schema/categorize')



// 新增分类
router.post('/addCategorize', validate(addCategorizeSchema), categorizeHandler.addCategorize)


module.exports = router
