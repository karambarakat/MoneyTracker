/* eslint-disable no-empty-pattern */
// todo: once openapi is implemented, this file could auto-generated
import { Action } from '@src/utils/fetch_'
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
  //
  () => ({
    path: '/log',
    method: 'GET',
  })

export const find_one_log: Action<{ id: string }, SchemaLogOut> =
  //
  ({ id }: { id: string }) => ({
    path: '/log/' + id,
    method: 'GET',
  })

export const create_log: Action<SchemaLogIn, SchemaLogOut> =
  //
  data => ({
    path: '/log',
    method: 'POST',
    body: JSON.stringify(data),
  })

export const update_log: Action<
  Partial<SchemaLogIn> & { id: string },
  SchemaLogOut
> =
  //
  ({ id, ...data }) => ({
    path: '/log/' + id,
    method: 'POST',
    body: JSON.stringify(data),
  })

export const delete_log: Action<{ id: string }, null> =
  //
  ({ id }) => ({
    path: '/log/' + id,
    method: 'DELETE',
  })

export const find_category: Action<object, SchemaCategoryOut[]> =
  //
  () => ({
    path: '/category',
    method: 'GET',
  })

export const find_one_category: Action<{ id: string }, SchemaCategoryOut> =
  //
  ({ id }) => ({
    path: '/category/' + id,
    method: 'GET',
  })

export const create_category: Action<SchemaCategoryIn, SchemaCategoryOut> =
  //
  data => ({
    path: '/category',
    method: 'POST',
    body: JSON.stringify(data),
  })

export const update_category: Action<
  Partial<SchemaCategoryIn> & { id: string },
  SchemaCategoryOut
> =
  //
  ({ id, ...data }) => ({
    path: '/category/' + id,
    method: 'POST',
    body: JSON.stringify(data),
  })

export const delete_category: Action<{ id: string }, null> =
  //
  ({ id }) => ({
    path: '/category/' + id,
    method: 'DELETE',
  })

export const find_all_logs_by_category: Action<{ id: string }, SchemaLogOut[]> =
  //
  ({ id }) => ({
    path: '/category/' + id + '/logs',
    method: 'GET',
  })

export const register: Action<
  RoutesAuthLocalRegister & RoutesAuthLocalLogin,
  SchemaProfile
> =
  //
  ({ displayName, ...data }) => ({
    path: '/auth/local/register',
    method: 'POST',
    body: JSON.stringify({ displayName }),
    headers: {
      Authentication: 'Basic ' + encode(data.email, data.password),
    },
  })

export const login: Action<RoutesAuthLocalLogin, SchemaProfile> =
  //
  data => ({
    path: '/auth/local/login',
    method: 'POST',
    headers: {
      Authentication: 'Basic ' + encode(data.email, data.password),
    },
  })

export const email_status: Action<RoutesEmailStatus, ('local' | 'google')[]> =
  //
  data => ({
    path: '/profile/status',
    method: 'GET',
    body: JSON.stringify(data),
  })

export const profile: Action<object, SchemaProfile> =
  //
  () => ({
    path: '/profile',
    method: 'GET',
  })

export const update_profile: Action<RoutesProfileUpdate, SchemaProfile> =
  //
  data => ({
    path: '/profile',
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const set_password: Action<
  RoutesUpdatePasswordLocal | RoutesUpdatePasswordNolocal,
  null
> =
  //
  data => ({
    path: '/profile/password',
    method: 'PUT',
    body: JSON.stringify(data),
  })

function encode(email: string, password: string) {
  return Buffer.from(email + ':' + password).toString('base64')
}