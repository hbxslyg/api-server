const express = require('express')
const path = require('path')
const config = require('../config')
const router = express.Router()
const multer  = require('multer')

const articleHandler = require('../router-handler/article')
const { validate } = require('express-validation')
const { addArticleSchema, getArticleDetailedSchema } = require('../schema/article')


const storage = multer.diskStorage({
  destination: path.join(config.uploadPath, './files'),
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// 添加文章
router.post('/addArticle', upload.single('cover_img'), validate(addArticleSchema), articleHandler.addArticle)

// 获取文章列表
router.get('/getArticleList', articleHandler.getArticleList)

// 获取文章详情
router.post('/getArticleDetailed', validate(getArticleDetailedSchema), articleHandler.getArticleDetailed)

module.exports = router