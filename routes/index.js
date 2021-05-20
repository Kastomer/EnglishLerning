const knex = require("../db.js");
var session = require('express-session');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const school = await knex.select("*").from('school');
    res.render('index', {school: school});
  }catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/regstudent', async function (req, res, next){
  const {lostname, firstname, patronymic, phone, email, password, classRoom, schoolId} = req.body;
  let studentId;
  try {
    await knex('students').insert([{
      lostname: lostname,
      firstname: firstname,
      patronymic: patronymic,
      phone: phone,
      email: email,
      password: password,
      class : classRoom,
      id_school: schoolId
    }]);
    [studentId]= await knex.select("id").from("students").where({phone: phone});
    req.session.nameUser = "student";
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.send({route: `/student-lk/${studentId.id}`}).end();
});

router.post('/logstudent', async function (req, res, next){
  const {login, password} = req.body;
  const [user] = await knex.select('*').from('students').where('email', login).orWhere({'phone' : login});

  if (user && password == user.password) {
    req.session.nameUser = "student";
    res.send({route: `/student-lk/${user.id}`}).end();
  }else {
    res.status(400).end();
  }
})

router.post('/regteacher', async function (req, res, next){
  const {lostname, firstname, patronymic, phone, email, password, schoolId} = req.body;
  
  let user;

  try {
    await knex('teachers').insert([{
      lostname: lostname,
      firstname: firstname,
      patronymic: patronymic,
      phone: phone,
      email: email,
      password: password,
      id_school: schoolId
    }]);
    req.session.nameUser = "teacher";
    [user]= await knex.select("id").from("teachers").where({phone: phone});
    res.send({route: `/teacher-lk/${user.id}`}).end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/logteacher', async function (req, res, next){
  const {login, password} = req.body;
  const [user] = await knex.select('*').from('teachers').where('email', login).orWhere({'phone' : login});

  if (user && password == user.password) {
    req.session.nameUser = "teacher";
    res.send({route: `/teacher-lk/${user.id}`}).end();
  }else {
    res.status(400).end();
  }
})

module.exports = router;
