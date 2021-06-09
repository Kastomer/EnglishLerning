// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'Awals321',
        database : 'mydb',
        insecureAuth : true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migration'
    }
  },



};
