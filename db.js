const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'awals321',
        database : 'mydb',
        insecureAuth : true
    }
  });

module.exports = knex;
