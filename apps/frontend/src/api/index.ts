/* eslint-disable no-empty-pattern */
// todo: once openapi is implemented, this file could auto-generated
import fetch_, { Action } from '@src/utils/fetch_'
import {
  SchemaCategoryIn,
  SchemaCategoryOut,
  SchemaLogIn,
  SchemaLogOut,
  SchemaProfile,
} from 'types/dist/schema'
import {
  RoutesAuthLocalLogin,
  RoutesAuthLocalRegister,
  RoutesEmailStatus,
  RoutesProfileUpdate,
  RoutesUpdatePasswordLocal,
  RoutesUpdatePasswordNolocal,
} from 'types/dist/routes'

export const find_log: Action<object, SchemaLogOut[]> =
  () =>
  ({}) =>
    fetch_('/log', {
      method: 'GET',
    })

export const find_one_log: Action<{ id: string }, SchemaLogOut> =
  ({ id }) =>
  ({}) =>
    fetch_('/log/' + id, {
      method: 'GET',
    })

export const create_log: Action<SchemaLogIn, SchemaLogOut> =
  data =>
  ({}) =>
    fetch_('/log', {
      method: 'POST',
      body: JSON.stringify(data),
    })

export const update_log: Action<
  Partial<SchemaLogIn> & { id: string },
  SchemaLogOut
> =
  ({ id, ...data }) =>
  ({}) =>
    fetch_('/log/' + id, {
      method: 'POST',
      body: JSON.stringify(data),
    })

export const delete_log: Action<{ id: string }, null> =
  ({ id }) =>
  ({}) =>
    fetch_('/log/' + id, {
      method: 'DELETE',
    })

export const find_category: Action<object, SchemaCategoryOut[]> =
  () =>
  ({}) =>
    fetch_('/category', {
      method: 'GET',
    })

export const find_one_category: Action<{ id: string }, SchemaCategoryOut> =
  ({ id }) =>
  ({}) =>
    fetch_('/category/' + id, {
      method: 'GET',
    })

export const create_category: Action<SchemaCategoryIn, SchemaCategoryOut> =
  data =>
  ({}) =>
    fetch_('/category', {
      method: 'POST',
      body: JSON.stringify(data),
    })

export const update_category: Action<
  Partial<SchemaCategoryIn> & { id: string },
  SchemaCategoryOut
> =
  ({ id, ...data }) =>
  ({}) =>
    fetch_('/category/' + id, {
      method: 'POST',
      body: JSON.stringify(data),
    })

export const delete_category: Action<{ id: string }, null> =
  ({ id }) =>
  ({}) =>
    fetch_('/category/' + id, {
      method: 'DELETE',
    })

export const find_all_logs_by_category: Action<
  { id: string },
  SchemaLogOut[]
> =
  ({ id }) =>
  ({}) =>
    fetch_('/category/' + id + '/logs', {
      method: 'GET',
    })

export const register: Action<
  RoutesAuthLocalRegister & RoutesAuthLocalLogin,
  SchemaProfile
> =
  ({ displayName, ...data }) =>
  ({}) =>
    fetch_('/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({ displayName }),
      headers: {
        Authentication: 'Basic ' + encode(data.email, data.password),
      },
    })

export const login: Action<RoutesAuthLocalLogin, SchemaProfile> =
  data =>
  ({}) =>
    fetch_('/auth/local/login', {
      method: 'POST',
      headers: {
        Authentication: 'Basic ' + encode(data.email, data.password),
      },
    })

export const email_status: Action<RoutesEmailStatus, ('local' | 'google')[]> =
  data =>
  ({}) =>
    fetch_('/profile/status', {
      method: 'GET',
      body: JSON.stringify(data),
    })

export const profile: Action<object, SchemaProfile> =
  () =>
  ({}) =>
    fetch_('/profile', {
      method: 'GET',
    })

export const update_profile: Action<RoutesProfileUpdate, SchemaProfile> =
  data =>
  ({}) =>
    fetch_('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })

export const set_password: Action<
  RoutesUpdatePasswordLocal | RoutesUpdatePasswordNolocal,
  null
> =
  data =>
  ({}) =>
    fetch_('/profile/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    })

function encode(email: string, password: string) {
  return Buffer.from(email + ':' + password).toString('base64')
}
