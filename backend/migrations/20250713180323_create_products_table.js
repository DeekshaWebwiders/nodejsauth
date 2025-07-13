/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock').defaultTo(0);
    table.string('image').nullable(); // if you're uploading image filenames
    table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('SET NULL');
    table.timestamps(true, true); // created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
