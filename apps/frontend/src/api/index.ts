/* eslint-disable no-empty-pattern */
// todo: once openapi is implemented, this file could auto-generated
import { Action } from '@src/lib/react-query'
import {
  SchemaCategoryIn,
  SchemaCategoryOut,
  SchemaLogIn,
  SchemaLogOut,
  SchemaProfile,
} from 'types/dist/ts/schema'
import {
  RoutesAuthLocalLogin,
  RoutesAuthLocalRegister,
  RoutesEmailStatus,
  RoutesProfileUpdate,
  RoutesUpdatePasswordLocal,
  RoutesUpdatePasswordNolocal,
} from 'types/dist/ts/routes'

export const find_log: Action<object, SchemaLogOut[]> =
  //
  () => ({
    path: '/log',
    method: 'GET',
  })

export const find_one_log: Action<{ _id: string }, SchemaLogOut> =
  //
  ({ _id }: { _id: string }) => ({
    path: '/log/' + _id,
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
  Partial<SchemaLogIn> & { _id: string },
  SchemaLogOut
> =
  //
  ({ _id, ...data }) => ({
    path: '/log/' + _id,
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const delete_log: Action<{ _id: string }, null> =
  //
  ({ _id }) => ({
    path: '/log/' + _id,
    method: 'DELETE',
  })

export const find_category: Action<object, SchemaCategoryOut[]> =
  //
  () => ({
    path: '/category',
    method: 'GET',
  })

export const find_one_category: Action<{ _id: string }, SchemaCategoryOut> =
  //
  ({ _id }) => ({
    path: '/category/' + _id,
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
  Partial<SchemaCategoryIn> & { _id: string },
  SchemaCategoryOut
> =
  //
  ({ _id, ...data }) => ({
    path: '/category/' + _id,
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const delete_category: Action<{ _id: string }, null> =
  //
  ({ _id }) => ({
    path: '/category/' + _id,
    method: 'DELETE',
  })

// todo: should be removed in favor of filtering feature
export const find_all_logs_by_category: Action<
  { _id: string },
  SchemaLogOut[]
> =
  //
  ({ _id }) => ({
    path: '/category/' + _id + '/logs',
    method: 'GET',
  })

// todo: in formik I pass confirmPassword, here this will not get passed
// but in different actions that uses `JSON.stringify(data)` it will be passed
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
      Authorization: 'Basic ' + btoa(data.email + ':' + data.password),
    },
  })

export const login: Action<RoutesAuthLocalLogin, SchemaProfile> =
  //
  data => ({
    path: '/auth/local/login',
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(data.email + ':' + data.password),
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
