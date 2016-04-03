import { Reducers } from '../../src'

describe('Reducers', () => {
  describe('Entities Reducer', () => {
    expect(Reducers.entities).to.be.a('function')
  })
  describe('Account Reducer', () => {
    expect(Reducers.account).to.be.a('function')
  })
})
