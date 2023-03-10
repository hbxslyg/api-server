const express = require('express')
const { validate } = require('express-validation')
const router = express.Router()

const categorizeHandler = require('../router-handler/categorize')
const {
  addCategorizeSchema,
  getCategorizeSchema,
  updateCategorizeSchema
} = require('../schema/categorize')



// 新增分类
router.post('/addCategorize', validate(addCategorizeSchema), categorizeHandler.addCategorize)

// 查询分类
router.post('/getCategorize', validate(getCategorizeSchema), categorizeHandler.getCategorize)

// 更新分类
router.post('/updateCategorize', validate(updateCategorizeSchema), categorizeHandler.updateCategorize)


module.exports = router
