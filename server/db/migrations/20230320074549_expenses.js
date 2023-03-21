/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('expenses', function (table) {
    table.increments('id');
    table.string('description').notNullable();
    table.decimal('amount').notNullable();
    table.integer('budget_id').notNullable().references('id').inTable('budgets').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('expenses');
};