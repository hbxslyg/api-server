const db = require('../db')

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
