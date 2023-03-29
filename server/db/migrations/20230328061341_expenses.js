/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', function (table) {
    table.increments('id').primary()
    table.string('category').notNullable()
    table.decimal('amount', 12, 2).notNullable()
    table
      .integer('budget_id')
      .unsigned()
      .references('id')
      .inTable('budgets')
      .onDelete('CASCADE')
      .notNullable()
    table.integer('user_id').notNullable()
    table.date('date').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('expenses')
}
