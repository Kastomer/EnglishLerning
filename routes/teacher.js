var express = require('express');
var fs = require('fs');
const knex = require("../database/db");
var router = express.Router();

router.get('/:id', async function (req, res, next) {
  const id = req.params.id;
  let teacher, complite, tests;
  if (req.session.nameUser != `teacher:${id}`) {
    res.redirect("/");
  }
  try {
    [teacher] = await knex.select("*").from("teachers").where({id: id});
    complite = await knex.select('*').from('complite').join('students','id_student','=','students.id').join('tests','complite.id_test','=','tests.id').where('tests.id_teacher','=',id); //function(){this.on(.andOn('teachers.id','=',id)} join('teachers', 'tests.id_teacher','=','teachers.id')
    tests = await knex.select('*').from('tests').where({id_teacher: id});
  } catch {
    next(error);
  }
  res.render('teacherLK',{
    teacher: teacher,
    complite: complite,
    tests: tests
  });
});

router.post('/newtest', async function (req, res, next) {

  try {
    let rus = req.body.rus;
    let eng = req.body.eng;
    let { name, id, clas } = req.body;
    let vcb = [];
    for (let i = 0; i < eng.length; i++) {
      if (eng[i] != undefined && rus[i] != undefined) {
        vcb.push([ eng[i], rus[i]]);
      }
    }
    let src = `public/tests/${name}.txt`;
    fs.writeFileSync(src, JSON.stringify(vcb));
    vcb = [];
    await knex('tests').insert([{
      name: name,
      id_teacher: id,
      class: clas,
      src: src
    }]);
  } catch (error) {
    next(error);
  }
  res.end();
});

router.post('/deletecomtest', async function (req, res, next) {
  let {testId, studenId} = req.body;
  try {
    await knex('complite').where({id_test: testId}).where({id_student: studenId}).del();
  } catch (error) {
    next(error);
  }
  res.end();
})

router.post('/deletetest', async function (req, res, next) {
  let {testId} = req.body;
  let [{src}] = await knex.select('src').from('tests').where("id", testId);
  try {
    fs.unlink(src, function(err){
      if (err) {
        next(err);
      };
    });
    await knex('complite').where({id_test: testId}).del();
    await knex('tests').where({id: testId}).del();
  } catch (error) {
    next(error);
  }
  res.end();
})

module.exports = router;