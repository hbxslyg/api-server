const db = require('../db')

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