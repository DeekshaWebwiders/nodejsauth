exports.up = function (knex) {
  return knex.schema.createTable('notes', function (table) {
    table.increments('id').primary();
    table.string('title');
    table.text('content');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('notes');
};
