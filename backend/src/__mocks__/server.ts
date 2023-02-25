const start = jest.createMockFromModule<jest.MockInstance<any, any>>('../server')

console.log(start.mock)
export default start 