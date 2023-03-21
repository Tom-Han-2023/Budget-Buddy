/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('incomes').del()
  await knex('incomes').insert([
    { id: '1', amount: 2000 },
    { id: '2', amount: 500 },
    { id: '3', amount: 1000 },
  ])
}
