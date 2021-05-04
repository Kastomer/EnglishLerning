var express = require('express');
var fs = require('fs');
const knex = require("../db.js");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('teacherLK');
});

router.post('/newtest', async function (req, res, next) {

  try {
    let rus = req.body.rus;
    let eng = req.body.eng;
    let {
      name,
      id,
      clas
    } = req.body;
    let vcb = {
      eng: eng,
      rus: rus,
    }
    let src = `public/tests/${name}.txt`;
    fs.writeFileSync(src, JSON.stringify(vcb));
    await knex('tests').insert([{
      name: name,
      id_teacher: id,
      class: clas,
      src: src
    }]);
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.end();
});

module.exports = router;