/* global describe expect it */
import src from '../../src'

describe('module', () => {
  describe('exports', () => {
    it('devshare', () => {
      expect(src).to.respondTo('devshare')
    })
    it('firebaseStateReducer', () => {
      expect(src).to.respondTo('reducer')
    })
    it('reduxDevshare', () => {
      expect(src).to.respondTo('reduxDevshare')
    })
  })
})
