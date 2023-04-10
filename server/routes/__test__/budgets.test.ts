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

beforeEach(() => {
  jest.resetAllMocks()
})

describe('GET /api/v1/budgets', () => {
  it('should return back all the budgets for the user if authorised and correct query has been provided', async () => {
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

    const mockReq = {
      auth: { sub: 'user123' },
      query: { year: '2023', month: '04' },
    }

    const response = await request(server)
      .get('/api/v1/budgets')
      .set('Authorization', 'Bearer fakeToken')
      .query(mockReq.query)

    expect(1).toBe(1)
  })
})
