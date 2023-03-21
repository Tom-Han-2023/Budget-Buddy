/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('expenses').del()
  await knex('expenses').insert([
    { id: '1', description: 'Grocery shopping', amount: 50, budget_id: 1 },
    { id: '2', description: 'Dinner with friends', amount: 30, budget_id: 1 },
    { id: '3', description: 'Electricity bill', amount: 100, budget_id: 2 },
    { id: '4', description: 'Gas for car', amount: 40, budget_id: 3 },
  ])
}
