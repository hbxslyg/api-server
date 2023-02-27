const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const db = require("../db");

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
  const { username, password, email } = req.body;

  // 查询用户名是否存在
  let sql = `select * from ev_users where username=?`;
  db.query(sql, username, (err, result) => {

    if (err) return res.cc();
    if (result.length) return res.cc("用户名被占用");
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    
    const userInfo = { username, password: hash, email}

    // 插入数据
    let sql = `insert ev_users set ?`
    db.query(sql, userInfo, (err, result) => {

      if (err) return server500(res);
      if (result.affectedRows !== 1) return res.cc();

      res.ss();
    })
  });
};
