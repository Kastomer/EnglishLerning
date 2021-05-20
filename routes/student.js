var express = require('express');
const knex = require('../db');
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
    school: school
  });
});

module.exports = router;
