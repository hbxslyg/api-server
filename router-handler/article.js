const db = require('../db')

/**
 * 添加文章
 * @param {*} req 
 * @param {*} res 
 */
exports.addArticle = function (req, res) {
  const data = {
    ...req.body,
    cover_img: '/files/' + req.file.filename,
    author_id: req.auth.data.id
  }

  let sql = `insert ev_articles set ?`
  db.query(sql, data, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc("添加文章失败")

    res.send({
      id: result.insertId,
      ...data
    })
  })
};


/**
 * 获取文章列表（不包涵文章内容）
 * @param {*} req 
 * @param {*} res 
 */
exports.getArticleList = function(req, res) {

  let sql = `select id, title, cover_img, pub_date, status from ev_articles`
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    
    res.send({
      code: 1,
      msg: 'ok',
      data: result
    })
  })
}


/**
 * 获取文章详情
 * @param {*} req 
 * @param {*} res 
 */
exports.getArticleDetailed = function(req, res) {
  const { id } = req.body
  
  let sql = `select * from ev_articles where id=?`
  db.query(sql, id, (err, result) => {
    if (err) res.cc(err)
    if (result.length !== 1) return res.cc("获取文章失败")

    res.send({
      code: 0,
      msg: 'ok',
      data: result[0]
    })
  })
}
