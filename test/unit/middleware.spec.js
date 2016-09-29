// /* global describe it chai */
// import middleware from '../../src/middleware'
//
// describe.skip('grout middleware', () => {
//   const doDispatch = () => {}
//   const doGetState = () => {}
//   const nextHandler = middleware({dispatch: doDispatch, getState: doGetState})
//   it('must return a function to handle next', () => {
//     chai.assert.isFunction(nextHandler)
//     chai.assert.strictEqual(nextHandler.length, 1)
//   })
//   describe.skip('handle errors', () => {
//     it('must throw if argument is non-object', done => {
//       try {
//         middleware()
//       } catch (err) {
//         done()
//       }
//     })
//   })
// })
