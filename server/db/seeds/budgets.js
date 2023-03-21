/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('budgets').del()
  await knex('budgets').insert([
    { id: '1', name: 'Groceries', category: 'Food', amount: 500 },
    { id: '2', name: 'Rent', category: 'Housing', amount: 1500 },
    { id: '3', name: 'Transportation', category: 'Travel', amount: 200 },
  ])
}
