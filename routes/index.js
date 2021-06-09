const knex = require("../database/db");
const bcrypt = require('bcrypt');
var session = require('express-session');
var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    res.render('index');
});

router.post('/regstudent', async function (req, res, next){
  const {lostname, firstname, patronymic, phone, email, password, classRoom} = req.body;
  let [user] = await knex.select('email','phone').from('students'), saltRounds = 10, mes;
  try {
    if ((phone == user.phone) || (email == user.email)){
      mes = 'Номер телефон или e-mail заняты другим пользователем';
      res.json({message: mes}).end();
      return;
    }
    await bcrypt.hash(password, saltRounds, async function(err, hash) {  
      await knex('students').insert([{
        lostname: lostname,
        firstname: firstname,
        patronymic: patronymic,
        phone: phone,
        email: email,
        password: hash,
        class : classRoom
      }]);
      [user]= await knex.select("id").from("students").where({phone: phone});
      req.session.nameUser = `student:${user.id}`;
      res.send({route: `/student-lk/${user.id}`}).end();
    });
  } catch (error) {
    next(error);
  }
  
});

router.post('/logstudent', async function (req, res, next){
  const {login, password} = req.body;
  const [user] = await knex.select('*').from('students').where('email', login).orWhere('phone' , login);
  if (await bcrypt.compare(password, user.password)) {
    req.session.nameUser = `student:${user.id}`;
    res.send({route: `/student-lk/${user.id}`}).end();
  }else {
    res.status(400).end();
  }
})

router.post('/regteacher', async function (req, res, next){
  const {lostname, firstname, patronymic, phone, email, password} = req.body;
  let [user] = await knex.select('email','phone').from('teachers'), saltRounds = 10, mes;
  try {
    await bcrypt.hash(password, saltRounds, async function(err, hash) {  
      if ((phone == user.phone) || (email == user.email)){
        mes = 'Номер телефон или e-mail заняты другим пользователем';
        res.json({message: mes}).end();
        return;
      }
      await knex('teachers').insert([{
        lostname: lostname,
        firstname: firstname,
        patronymic: patronymic,
        phone: phone,
        email: email,
        password: hash
      }]);
      [user]= await knex.select("id").from("teachers").where({phone: phone});
      req.session.nameUser = `teacher:${user.id}`;
      res.send({route: `/teacher-lk/${user.id}`}).end();
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logteacher', async function (req, res, next){
  const {login, password} = req.body;
  const [user] = await knex.select('*').from('teachers').where('email', login).orWhere('phone' , login);
  if (await bcrypt.compare(password, user.password)) {
    req.session.nameUser = `teacher:${user.id}`;
    res.send({route: `/teacher-lk/${user.id}`}).end();
  }else {
    res.status(400).end();
  }
})

module.exports = router;
