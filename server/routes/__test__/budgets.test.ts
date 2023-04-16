import request from 'supertest'
import server from '../../server'
import checkJwt, { JwtRequest } from '../../auth0'

import {
  getAllBudgets,
  addBudgets,
  deleteBudget,
  updateBudget,
} from '../../db/db'

jest.mock('../../db/db')
jest.mock('../../auth0')

afterAll(() => {
  jest.restoreAllMocks()
})

describe('GET /api/v1/budgets', () => {
  it('should return back all the budgets for the user if authorised and correct query has been provided', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    const mockBudgets = [
      {
        id: 1,
        user_id: 1,
        name: 'Groceries',
        amount: 500,
        date: new Date('2023-03-30T11:00:00.000Z'),
      },
      {
        id: 2,
        user_id: 1,
        name: 'Rent',
        amount: 1000,
        date: new Date('2023-03-30T11:00:00.000Z'),
      },
    ]
    jest.mocked(getAllBudgets).mockResolvedValue(mockBudgets)

    const response = await request(server)
      .get('/api/v1/budgets')
      .query({ year: '2023', month: 'April' })

    expect(response.body[0].name).toBe('Groceries')
    expect(response.body[1].name).toBe('Rent')
  })
  it('should return status code 401 if there is no userid', async () => {
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
      .get('/api/v1/budgets')
      .query({ year: '2023', month: 'April' })
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')

    expect(1).toBe(1)
  })
  it('should return status code 500 if there is  an error getting the budgets from database', async () => {
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
      .mocked(getAllBudgets)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .get('/api/v1/budgets')
      .query({ year: '2023', month: 'April' })

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to get the budgets :('
    )
  })
})

describe('POST /api/v1/budgets', () => {
  const newBudget = {
    name: 'Food',
    amount: 200,
    date: new Date('2023-03-30T11:00:00.000Z'),
  }
  it('should return the back the newly added budget if authorised correctly and inserted to the database', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(addBudgets).mockResolvedValue([{ id: 1 }])
    const response = await await request(server)
      .post('/api/v1/budgets')
      .send(newBudget)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
    expect(response.body.name).toBe('Food')
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
      .post('/api/v1/budgets')
      .send(newBudget)
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  it('should return status code 500 if there is ab error adding the budget from database', async () => {
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
      .mocked(addBudgets)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .post('/api/v1/budgets')
      .send(newBudget)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to add the budgets :('
    )
  })
})
describe('PATCH /api/v1/budgets/:id', () => {
  const newBudget = {
    name: 'Food',
    amount: 200,
    date: new Date('2023-03-30T11:00:00.000Z'),
  }
  it('should update the budget in the database and return the details of the updated budget', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(updateBudget).mockResolvedValue(1)
    const response = await await request(server)
      .patch('/api/v1/budgets/1')
      .send(newBudget)
    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(1)
    expect(response.body.name).toBe('Food')
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
      .patch('/api/v1/budgets/1')
      .send(newBudget)
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Unauthorized')
  })
  it('should return status code 500 if there is an error updating the budget from database', async () => {
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
      .mocked(updateBudget)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server)
      .patch('/api/v1/budgets/1')
      .send(newBudget)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to update the budget :('
    )
  })
})
describe('DELETE /api/v1/budgets/:id', () => {
  it('should delete the budget in the database and return the budgetId that was deleted', async () => {
    jest
      .mocked(checkJwt)
      .mockImplementation(async (req: JwtRequest, res, next) => {
        req.auth = {
          sub: 'auth0|123',
        }
        next()
      })
    jest.mocked(deleteBudget).mockResolvedValue(1)
    const response = await request(server).delete('/api/v1/budgets/1')
    expect(response.statusCode).toBe(200)
  })
  it('should return status code 500 if there is an error deleting the budget from database', async () => {
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
      .mocked(deleteBudget)
      .mockRejectedValue(new Error('Whoops, something went wrong'))
    const response = await request(server).delete('/api/v1/budgets/1')

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBe(
      'There was an error trying to delete the post :('
    )
  })
})
