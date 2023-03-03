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

  let sql = `select * from ev_users where username=?`
  db.query(sql, username, (err, result) => {
    
    if (err) return res.cc(err);
    if (!result.length) return res.cc("用户名或密码错误");

    const userInfo = result[0];

    if (!bcrypt.compareSync(password, userInfo.password)) return res.cc("用户名或密码错误");
    if (userInfo.status === 1) return res.cc("用户被禁用")

    const tokenData = {
      id: userInfo.id,
      username: userInfo.username
    }

    const token = jwt.sign({data: tokenData}, config.tokenKey, { expiresIn: "3h" });

    res.send({
      ...ok,
      data: {
        ...userInfo,
        password: undefined
      },
      token,
    });
  })
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
  const { id } = req.body;
  
  const sql = `select * from ev_users where id=?`
  db.query(sql, id, (err, result) => {

    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc("查询失败")
    
    res.send({
      ...ok,
      data: {
        ...result[0],
        password: undefined
      }
    })
  })
};


/**
 * 修改用户信息
 * @param {*} req 
 * @param {*} res 
 */
exports.updateUserInfo = function (req, res) {
  const { id } = req.body

  let sql = `select * from ev_users where id=?`;
  db.query(sql, id, (err, result) => {

    if (err) return res.cc(err);
    if (!result.length) return res.cc("用户不存在");

    let sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, id], (err, result) => {

      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("更新失败");
      res.ss()
    })
  })
}

/**
 * 修改用户密码
 * @param {*} req 
 * @param {*} res 
 */
exports.updatePassword = function (req, res) {
  const { password, newPassword } = req.body
  const id = req.auth.data.id

  let sql = `select password from ev_users where id=?`
  db.query(sql, id, (err, result) => {

    if (err) return res.cc(err);
    if (!result.length) return res.cc("用户不存在");
    if (!bcrypt.compareSync(password, result[0].password)) return res.cc("密码错误");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    let sql = `update ev_users set password=? where id=?`
    db.query(sql, [hash, id], (err, result) => {

      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("更新失败");

      res.ss()
    })
  })
}

/**
 * 修改头像
 * @param {*} req 
 * @param {*} res 
 */
exports.updateAvatar = function (req, res) {
  const { avatar } = req.body
  const id = req.auth.data.id

  let sql = `update ev_users set avatar=? where id=?`
  db.query(sql, [avatar, id], (err, result) => {

    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc("修改头像失败")

    res.ss()
  })
}


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

    if (err) return res.cc(err);
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
