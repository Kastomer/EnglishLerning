
exports.up = function(knex) {
   return knex.schema.createTable('students', function(table) {
        table.increments('id').primary();
        table.string('lostname').notNullable();
        table.string('firstname').notNullable();
        table.string('patronymic').notNullable();
        table.string('phone').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('class').notNullable();
    }).createTable('teachers', function(table) {
        table.increments('id').primary();
        table.string('lostname').notNullable();
        table.string('firstname').notNullable();
        table.string('patronymic').notNullable();
        table.string('phone').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    }).createTable('tests', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('class').notNullable();
        table.string('src').notNullable();
        table.integer('id_teacher').unsigned().notNullable().references('id').inTable('teachers');
    }).createTable('complite', function(table) {
        table.integer('id_test').unsigned().references('id').inTable('tests');
        table.integer('id_student').unsigned().references('id').inTable('students');
        table.integer('estimation').unsigned().notNullable();
        table.primary(['id_test', 'id_student']);
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('complite').dropTable('tests').dropTable('teachers').dropTable('students');
};
