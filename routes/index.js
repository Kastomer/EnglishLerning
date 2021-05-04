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
    req.session.nameUser = "student";
    res.end();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/logstudent', async function (req, res, next){
  const {login, password} = req.body;
  const [user] = await knex.select('*').from('students').where('email', login).orWhere({'phone' : login});

  if (user && password == user.password) {
    req.session.nameUser = "student";
    res.end();
  }else {
    res.status(400).end();
  }
})

router.post('/regteacher', async function (req, res, next){
  const {lostname, firstname, patronymic, phone, email, password, schoolId} = req.body;
  
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
    res.end();
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
    res.end();
  }else {
    res.status(400).end();
  }
})

module.exports = router;
