exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email').unique();
    table.timestamp('email_verified').nullable()
    table.string('password');
    table.string('mobile').nullable();
    table.string('gender').nullable();
    table.string('profile_picture').nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
