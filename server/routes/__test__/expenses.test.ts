import request from 'supertest'
import server from '../../server'
import checkJwt, { JwtRequest } from '../../auth0'

import {
  addExpenses,
  deleteExpenses,
  getAllExpenses,
  updateExpense,
} from '../../db/db'

jest.mock('../../db/db')
jest.mock('../../auth0')

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/v1/expenses', () => {
  it('should return back all the expenses with budgetName for the user if authorised and correct query has been provided', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    const mockExpenses = [
      {
        id: 1,
        user_id: '1',
        budget_id: 1,
        category: 'Food',
        amount: 50,
        date: '2023-03-15T11:00:00.000Z',
        budgetName: 'Groceries',
      },
      {
        id: 2,
        user_id: '1',
        budget_id: 1,
        category: 'Food',
        amount: 75,
        date: '2023-03-20T11:00:00.000Z',
        budgetName: 'Groceries',
      },
      {
        id: 2,
        user_id: '1',
        budget_id: null,
        category: 'Food',
        amount: 75,
        date: '2023-03-20T11:00:00.000Z',
        budgetName: '',
      },
    ]
    jest.mocked(getAllExpenses).mockResolvedValue(mockExpenses)

    const response = await request(server)
      .get('/api/v1/expenses')
      .query({ year: '2023', month: 'March' })

    expect(response.body[0].budgetName).toBe('Groceries')
    expect(response.body[0].amount).toBe(50)
    expect(response.body[0].category).toBe('Food')
    expect(response.body[1].category).toBe('Food')
    expect(response.body[1].amount).toBe(75)
    expect(response.body[2].budgetName).toBe('Uncategorized')
  })
  it('should return status code 401  if there is no userid', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: '',
        }
        next()
      })
    const response = await request(server)
      .get('/api/v1/expenses')
      .query({ year: '2023', month: 'March' })
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  it('should return status code 500 if there is an error getting the expenses from database', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest
      .mocked(getAllExpenses)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .get('/api/v1/expenses')
      .query({ year: '2023', month: 'March' })

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to get the expenses :('
    )
  })
})

describe('POST /api/v1/expenses/', () => {
  const newExpenses = {
    budget_id: 1,
    category: 'ToothPaste',
    amount: 15,
    date: '2023-03-22T11:00:00.000Z',
    budgetName: 'Groceries',
  }
  it('should return the back the newly added expense if authorised correctly and inserted to the database', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(addExpenses).mockResolvedValue([{ id: 1 }])
    const response = await await request(server)
      .post('/api/v1/expenses')
      .send(newExpenses)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
    expect(response.body.category).toBe('ToothPaste')
    expect(response.body.date).toBe('2023-03-22T11:00:00.000Z')
  })
  it('should return status code 401 if there if there is no userid', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: '',
        }
        next()
      })
    const response = await await request(server)
      .post('/api/v1/expenses')
      .send(newExpenses)
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  it('should return status code 500 if there is an error adding the expense to the  database', async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest
      .mocked(addExpenses)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .post('/api/v1/expenses')
      .send(newExpenses)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to add the new expenses :('
    )
  })
})
describe('PATCH /api/v1/expenses/::expenseid', () => {
  const updatedExpense = {
    budget_id: 1,
    category: 'Toliet Paper',
    amount: 25,
    date: '2023-03-22T11:00:00.000Z',
    budgetName: 'Groceries',
  }
  it('should update the expense in the database and return the details of the updated expense', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(updateExpense).mockResolvedValue(1)
    const response = await await request(server)
      .patch('/api/v1/expenses/1')
      .send(updatedExpense)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
    expect(response.body.category).toBe('Toliet Paper')
    expect(response.body.amount).toBe(25)
    expect(response.body.date).toBe('2023-03-22T11:00:00.000Z')
    expect(response.body.budgetName).toBe('Groceries')
  })
  it('should return status code 401 if there if there is no userid', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: '',
        }
        next()
      })
    const response = await await request(server)
      .patch('/api/v1/expenses/1')
      .send(updatedExpense)
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  it('should return status code 500 if there is an error updating the expense in the database', async () => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest
      .mocked(updateExpense)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .patch('/api/v1/expenses/1')
      .send(updatedExpense)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to update the expense :('
    )
  })
})
describe('DELETE /api/v1/expenses/:id', () => {
  it('should delete the expense in the database and return the expenseId that was deleted', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(deleteExpenses).mockResolvedValue(1)
    const response = await request(server).delete('/api/v1/expenses/2')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(2)
  })
  it('should return status code 500 if there is an error deleting the expense from database', async () => {
    // jest.spyOn(console, 'log').mockImplementation(() => {})
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest
      .mocked(deleteExpenses)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server).delete('/api/v1/expenses/2')

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to delete the expense :('
    )
  })
})
