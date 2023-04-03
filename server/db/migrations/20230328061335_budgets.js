/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('budgets', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.decimal('amount', 12, 2).notNullable()
    table.string('user_id').notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('budgets')
}
