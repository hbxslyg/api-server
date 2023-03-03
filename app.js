const express = require('express')
const path = require('path')
const cors = require('cors')
const jwt = require('express-jwt')
const config = require('./config')
const { ValidationError } = require('express-validation')


const userRouter = require('./router/user')
const categorizeRouter = require('./router/categorize')

const app = express()

// 配置静态文件路径
app.use('/files',express.static(path.join(config.uploadPath, './files')))

// 允许跨域
app.use(cors())

// 解析 post 请求的 url 编码
app.use(express.urlencoded({extended: false}))

// 解析 token 中间件
app.use(jwt.expressjwt({secret: config.tokenKey, algorithms: ["HS256"]}).unless({path: config.noAuth}))

// 快速响应中间件
app.use((req, res, next) => {
  res.cc = (err = "未知错误", code = 1) => {
    res.send({code, msg: err instanceof Error ? err.message : err})
  }

  res.ss = (msg = 'ok', code = 0) => {
    res.send({code, msg})
  }
  next()
})


// 注册路由
app.use('/api/user', userRouter)
app.use('/api/categorize', categorizeRouter)


// 捕获错误中间件
app.use((err, req, res, next) => {

  // token 解析失败
  if (err.name === 'UnauthorizedError') {
     return res.status(401).send({code: 401, msg: 'token 失效'})
  }

  // 接口参数验证错误
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({code: err.statusCode, msg: '参数格式错误'})
  }

  res.status(500).send({
    code: 500,
    msg: "未知错误"
  })
})


app.listen(2222)