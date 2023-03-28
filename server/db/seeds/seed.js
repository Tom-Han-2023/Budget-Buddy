/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      first_name: 'Tom',
      last_name: 'Han',
      email: 'tom@example.com',
      password: 'password',
    },
    {
      id: 2,
      first_name: 'Tommy',
      last_name: 'Han',
      email: 'tommy@example.com',
      password: 'password',
    },
    {
      id: 3,
      first_name: 'Thomas',
      last_name: 'Han',
      email: 'thomas@example.com',
      password: 'password',
    },
  ])
  await knex('budgets').del()
  await knex('budgets').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Groceries',
      amount: 500,
      date: '2023-01-01',
    },
    {
      id: 2,
      user_id: 1,
      name: 'Rent',
      amount: 1000,
      date: '2023-01-01',
    },
    {
      id: 3,
      user_id: 2,
      name: 'Transportation',
      amount: 200,
      date: '2023-01-01',
    },
    {
      id: 4,
      user_id: 2,
      name: 'Entertainment',
      amount: 300,
      date: '2023-01-01',
    },
    {
      id: 5,
      user_id: 3,
      name: 'Utilities',
      amount: 300,
      date: '2023-01-01',
    },
    {
      id: 6,
      user_id: 3,
      name: 'Insurance',
      amount: 200,
      date: '2023-01-01',
    },
  ])
  await knex('expenses').del()
  return await knex('expenses').insert([
    {
      id: 1,
      user_id: 1,
      budget_id: 1,
      category: 'Food',
      amount: 50,
      date: '2023-01-05',
    },
    {
      id: 2,
      user_id: 1,
      budget_id: 1,
      category: 'Food',
      amount: 75,
      date: '2023-01-10',
    },
    {
      id: 3,
      user_id: 1,
      budget_id: 2,
      category: 'Rent',
      amount: 1000,
      date: '2023-01-01',
    },
    {
      id: 4,
      user_id: 2,
      budget_id: 3,
      category: 'Public Transit',
      amount: 100,
      date: '2023-01-05',
    },
    {
      id: 5,
      user_id: 2,
      budget_id: 3,
      category: 'Gas',
      amount: 50,
      date: '2023-01-10',
    },
    {
      id: 6,
      user_id: 2,
      budget_id: 4,
      category: 'Movies',
      amount: 150,
      date: '2023-01-05',
    },
    {
      id: 7,
      user_id: 3,
      budget_id: 5,
      category: 'Electricity',
      amount: 150,
      date: '2023-01-05',
    },
    {
      id: 8,
      user_id: 3,
      budget_id: 5,
      category: 'Gas',
      amount: 50,
      date: '2023-01-10',
    },
    {
      id: 9,
      user_id: 3,
      budget_id: 6,
      category: 'Health Insurance',
      amount: 200,
      date: '2023-01-01',
    },
  ])
}
