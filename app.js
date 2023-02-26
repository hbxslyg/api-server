const express = require('express')
const cors = require('cors')
const jwt = require('express-jwt')
const config = require('./config')


const userRouter = require('./router/user')

const app = express()

// 允许跨域
app.use(cors())

// 解析 post 请求的 url 编码
app.use(express.urlencoded({extended: false}))

// 解析 token 中间件
app.use(jwt.expressjwt({secret: config.tokenKey, algorithms: ["HS256"]}).unless({path: config.noAuth}))

// 捕获错误中间件
app.use((err, req, res, next) => {

  // token 解析失败
  if (err.name === 'UnauthorizedError') {
     return res.status(401).send({code: 401, msg: 'token 失效'})
  }

  res.status(500).send({
    code: 500,
    msg: "未知错误"
  })
})


// 注册路由
app.use('/api/user', userRouter)






app.listen(2222)