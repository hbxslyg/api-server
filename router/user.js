const express = require('express')
const router = express.Router()

const userHandler = require("../router-handler/user")

// 登录
router.post('/login', userHandler.login)

// 退出
router.post('/logout', userHandler.logout)

// 获取用户信息
router.post('/getUserInfo', userHandler.getUserInfo)

// 注册
router.post('/register', userHandler.register)



module.exports = router