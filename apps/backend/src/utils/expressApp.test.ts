import { HttpError } from '@utils/httpError'
import { BasicToken } from './expressApp'
import { Request } from 'express'
import { BadBasicToken } from '@utils/httpError/errTypes'
import '../../tests/helpers/initJest.js'


describe('testing basic token extraction and validation', () => {
  test('valid req', () => {
    const req = { headers: { authorization: 'Basic dXNlcjpwYXNz' } } as Request
    expect(() => BasicToken(req)).not.toThrowError()
    const { email, password } = BasicToken(req)
    expect(email).toBe('user')
    expect(password).toBe('pass')
  })
  test('init', () => {
    expect(typeof BasicToken).toEqual('function')
  })
  test('no header', () => {
    const req = { headers: {} } as Request
    expect(() => BasicToken(req)).toCatch((error) => {
      expect(error).toMatchHttpError(BadBasicToken())
    })
  })
  test('invalid basic token', () => {
    const req = { headers: { authorization: 'Bearrer dXNlcjpwYXNz' } } as Request
    expect(() => BasicToken(req)).toCatch((error) => {
      expect(error).toMatchHttpError(BadBasicToken())
    })
  })
  test('invalid base64', () => {
    const req = { headers: { authorization: 'Basic ' + 'base64' } } as Request
    expect(() => BasicToken(req)).toCatch((error) => {
      expect(error).toMatchHttpError(BadBasicToken())
    })
  })
  test('invalid user:pass format', () => {
    const base64 = Buffer.from('user-pass').toString('base64')
    const req = { headers: { authorization: 'Basic ' + base64 } } as Request
    expect(() => BasicToken(req)).toCatch((error) => {
      expect(error).toMatchHttpError(BadBasicToken())
    })
  })
})