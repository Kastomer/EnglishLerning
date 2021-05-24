var express = require('express');
const knex = require('../db');
var fs = require('fs');
var router = express.Router();


router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  let student, school, complite, test;
  try {
    [student] = await knex.select("*").from("students").where({id: id});
    school = await knex.select("*").from('school');
    complite = await knex.select('*').from('complite').join('tests','id_test','tests.id').where({id_student: id});
    test = await knex.select('*').from('tests').leftJoin('complite','tests.id','id_test').where({id_test: null}).where({id_teacher: student.id_teacher}).where('class', student.class);
    console.log(test);
  } catch {
    console.log(error);
    next(error);
  }
  res.render('studentLK',{
    student: student,
    school: school,
    tests: test,
    compliteTest: complite
  });
});

router.post('/comtest', async function(req, res, next) {
  const id_test = req.body.id_test;
  let [{src}] = await knex.select('src').from('tests').where("id", id_test);
  src = src.replace("\n","");
  console.log(src);
  let content = fs.readFileSync(src, "utf8");
  console.log(content); // отправить на фронт
  res.end();
})

router.post('/comtest1', async function(req, res, next) {
  const id = req.body.id;
  const id_test = req.body.id_test;
  const prov = req.body.prov;
  let [{src}] = await knex.select('src').from('tests').where("id", id_test);
  src = src.replace("\n","");
  let content = fs.readFileSync(src, "utf8");
  content = content.split('"');
  let engrus=[], result = [],estimation, g = 0, fal = '';
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
    if (engrus[i] != result[x]) fal+=`${x} `; else g++;
  }
  if( g/(engrus.length / 2)>= 0.90) estimation = 5; else if(g/(engrus.length / 2)>= 0.75) estimation  = 4; else if (g/(engrus.length / 2)>= 0.60) estimation = 3; else estimation = 2;  
  console.log(fal, g, estimation)// отправлять на фронт где ощибки и оценку

  await knex('complite').insert([{
    id_student: id,
    id_test: id_test,
    estimation: estimation
  }]);
  res.end();
})

module.exports = router;
