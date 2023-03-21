/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('budgets', function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.string('category').notNullable()
    table.decimal('amount').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('budgets')
}
