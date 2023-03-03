const path = require('path')

module.exports = {
  tokenKey: "niubi",
  noAuth: [
    '/api/user/login',
    '/api/user/register',
    '/api/user/test'
  ],
  // uploadPath: '/Users/lidakang/study/public/'
  uploadPath: path.join(process.env.HOME || process.env.USERPROFILE, 'study/public')
}