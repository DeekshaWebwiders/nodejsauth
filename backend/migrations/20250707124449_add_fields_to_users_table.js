/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    exports.up = function (knex) {
    return knex.schema.table('users', function (table) {
        table.string('mobile').nullable();
        table.string('gender').nullable();
        table.string('profile_picture').nullable(); // store filename or path
    });
    };
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    exports.down = function (knex) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('mobile');
        table.dropColumn('gender');
        table.dropColumn('profile_picture');
    });
    };