var express = require('express');
const knex = require('../db');
var router = express.Router();


router.get('/:id', async function(req, res, next) {
  const id = req.params.id;
  let student, school;
  try {
    [student] = await knex.select("*").from("students") .where({id: id});
    school = await knex.select("*").from('school');
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
