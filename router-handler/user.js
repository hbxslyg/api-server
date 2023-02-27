const jwt = require("jsonwebtoken");
const config = require("../config");

const ok = {
  code: 0,
  msg: "ok",
};

/**
 * 登录
 * @param {objectj} req
 * @param req.body.username 用户名
 * @param req.body.password 密码
 * @param {object} res
 * @param res.token
 * @param res.data 用户信息
 * @returns
 */
exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username !== "ldk" || password !== "111")
    return res.send({
      code: 1,
      msg: "账号或密码错误",
    });

  const token = jwt.sign({ username }, config.tokenKey, { expiresIn: "600s" });

  res.send({
    ...ok,
    data: {
      username,
    },
    token,
  });
};

/**
 * 退出
 * @param {*} req
 * @param {*} res
 */
exports.logout = function (req, res) {
  res.send(ok);
};
/**
 * 获取用户信息
 * @param {*} req
 * @param {*} res
 */
exports.getUserInfo = function (req, res) {
  res.send({
    code: 0,
    msg: "",
    data: {
      ...req.auth,
      iat: undefined,
      exp: undefined,
    },
  });
};

/**
   * 注册
   * @param {*} req 
   * @param {*} res 
   */
exports.register = function (req, res) {
   
  res.send(ok)



};
