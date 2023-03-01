const express = require('express')
const router = express.Router()

const categorizeHandler = require('../router-handler/categorize')


// 新增分类
router.post('/addCategorize', categorizeHandler.addCategorize)


module.exports = router
