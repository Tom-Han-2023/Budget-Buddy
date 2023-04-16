import config from '../knexfile'

describe('afterCreate PRAGMA', () => {
  it('enforces foreign keys (development)', () => {
    const cb = {}
    const db = { run: jest.fn() }
    config.development.pool.afterCreate(db, cb)
    expect(db.run).toHaveBeenCalledWith('PRAGMA foreign_keys = ON', cb)
  })
})
