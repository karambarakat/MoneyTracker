import { Middleware } from 'redux'

const LoggerMiddleware: Middleware = (store) => (next) => (action) => {
  const n = next(action)
  console.log(n)
  return n
}

export default LoggerMiddleware
