var express = require('express');
const knex = require('../database/db');
var fs = require('fs');
var router = express.Router();

router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  let student, complite, test, content, engrus = [], eng = [], g = 0;
  if (req.session.nameUser != `student:${id}`) {
    res.redirect("/");
  }
  try {
    [student] = await knex.select("*").from("students").where({id: id});
    complite = await knex.select('*').from('complite').join('tests','id_test','tests.id').where({id_student: id});
    test = await knex.select('*').from('tests').leftJoin('complite','tests.id','id_test').where({id_test: null}).where('class', student.class);
  } catch {
    next(error);
  }
  test.forEach(test =>{
    test.src = test.src.replace("\n","");
    content = fs.readFileSync(test.src, "utf8");
    content = content.split('"');
    g = 0
    for (let i = 0; i < content.length; i++){
      if (i % 2 != 0) {
        engrus[g] = content[i];
        g++;
      }
    };
    g = 0;
    for (let i = 0; i < engrus.length; i++){
      if (i % 2 == 0) {
        eng.push(engrus[i]);
      };
    };
    test.eng = eng;
    eng = [];
  })
  res.render('studentLK',{
    student: student,
    tests: test,
    compliteTest: complite
  });
});

router.post('/comtest', async function(req, res, next) {
  const id = req.body.id;
  const id_test = req.body.id_test;
  const prov = req.body.prov;
  let [{src}] = await knex.select('src').from('tests').where("id", id_test);
  src = src.replace("\n","");
  let content = fs.readFileSync(src, "utf8");
  content = content.split('"');
  let engrus=[], result = [],estimation, g = 0, fal = [];
  for (let i = 0; i < content.length; i++){
    if (i % 2 != 0) {
      engrus[g] = content[i];
      g++;
    }
  };
  for (let i in prov) {
    let v = prov[i];
    result.push(v);
  }
  g = 0;
  for (let i = 1, x=0; i < engrus.length;x++, i+=2){
    if (engrus[i] != result[x]) fal.push(x+1); else g++;
  }
  if( g/(engrus.length / 2)>= 0.90) estimation = 5; else if(g/(engrus.length / 2)>= 0.75) estimation  = 4; else if (g/(engrus.length / 2)>= 0.60) estimation = 3; else estimation = 2;  
  await knex('complite').insert([{
    id_student: id,
    id_test: id_test,
    estimation: estimation
  }]);
  res.json({fal: fal, estimation: estimation}).end();
})


module.exports = router;
