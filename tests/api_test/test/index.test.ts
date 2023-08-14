import fetch from '../helpers/fetch'

it('root', async () => {
  const test = await fetch('/')

  expect(test).toMatchSnapshot()
})
