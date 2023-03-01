const db = require('../db')

const ok = {
  code: 0,
  msg: 'ok'
}

/**
 * 新增一个分类
 * @param {*} req 
 * @param {*} res 
 */
exports.addCategorize = function (req, res) {
  const { name, alias } = req.body

  let sql = `select name from ev_article_categorize where name=?`
  db.query(sql, name, (err, result) => {

    if (err) return res.cc(err);
    if (result.length) return res.cc("分类已存在")

    let sql = `insert ev_article_categorize set ?`
    db.query(sql, {name, alias}, (err, result) => {
      
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("创建失败")

      res.ss()
    })
  })
}

/**
 * 获取分类
 * @param {*} req 
 * @param {*} res 
 */
exports.getCategorize = function (req, res) {
  const { id } = req.body

  let sql = `select * from ev_article_categorize` + (id ? ' where id=?' : '')
  db.query(sql, [id], (err, result) => {
    if (err) return res.cc(err);
    res.send({
      ...ok,
      data: result
    })
  })
}

/**
 * 更新分类
 * @param {*} req 
 * @param {*} res 
 */
exports.updateCategorize = function (req, res) {
  const { id } = req.body

  let sql = `select id from ev_article_categorize where id=?`
  db.query(sql, id, (err, result) => {
    
    if (err) return res.cc(err)
    if (!result.length) return res.cc("次分类不存在")

    let sql = `update ev_article_categorize set ? where id=?`
    db.query(sql, [req.body, id], (err, result) => {
      
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("更新失败")

      res.ss()
    })
  })
}