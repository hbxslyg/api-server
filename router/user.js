const express = require('express')
const router = express.Router()
const { validate } = require('express-validation')

const userHandler = require("../router-handler/user")

const { loginSchema, registerSchema } = require('../schema/user')

// 登录
router.post('/login', validate(loginSchema), userHandler.login)

// 退出
router.post('/logout', userHandler.logout)

// 获取用户信息
router.post('/getUserInfo', userHandler.getUserInfo)

// 注册
router.post('/register', validate(registerSchema), userHandler.register)



module.exports = router