/* eslint-disable no-empty-pattern */
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
import { getProfile } from '@src/utils/localProfile'

export const find_log = (pagination: { page: number; pageSize: number }) => {
  return fetch('/log', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(r => r.json() as Promise<SchemaLogOut[]>)
    .then(data => paged(data, pagination))
}

const paged = <T>(
  data: T[],
  pagination: { page: number; pageSize: number },
) => {
  return {
    data: data
      .reverse()
      .slice(
        (pagination.page - 1) * pagination.pageSize,
        pagination.page * pagination.pageSize,
      )
      .reverse(),
    meta: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        pageCount: Math.ceil(data.length / pagination.pageSize),
        total: data.length,
      },
    },
  }
}

export const find_one_log = ({ _id }: { _id: string }) => {
  return fetch(`/log/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaLogOut>)
}

export const create_log = (_input: SchemaLogIn) => {
  return fetch('/log', {
    method: 'POST',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaLogOut>)
}

export const update_log = ({
  _id,
  ..._input
}: { _id: string } & SchemaLogIn) => {
  return fetch(`/log/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaLogOut>)
}

export const delete_log = ({ _id }: { _id: string }) => {
  return fetch(`/log/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<null>)
}

export const find_category = () => {
  return fetch('/category', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaCategoryOut[]>)
}

export const find_one_category = ({ _id }: { _id: string }) => {
  return fetch(`/category/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaCategoryOut>)
}

export const create_category = (_input: SchemaCategoryIn) => {
  return fetch('/category', {
    method: 'POST',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaCategoryOut>)
}

export const update_category = ({
  _id,
  ..._input
}: { _id: string } & Partial<SchemaCategoryIn>) => {
  return fetch(`/category/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaCategoryOut>)
}

export const delete_category = ({ _id }: { _id: string }) => {
  return fetch(`/category/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<null>)
}

export const find_all_logs_by_category = ({ _id }: { _id: string }) => {
  return fetch(`/category/${_id}/logs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaLogOut[]>)
}

export const register = ({
  email,
  password,
  ...body
}: RoutesAuthLocalLogin & RoutesAuthLocalRegister) => {
  return fetch('/auth/local/register', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString(
        'base64',
      )}`,
    },
  }).then(r => r.json() as Promise<SchemaProfile>)
}

export const login = ({ email, password }: RoutesAuthLocalLogin) => {
  return fetch('/auth/local/login', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${email}:${password}`).toString(
        'base64',
      )}`,
    },
  }).then(r => r.json() as Promise<SchemaProfile>)
}

export const email_status = ({ email }: RoutesEmailStatus) => {
  return fetch('/profile/status', {
    method: 'GET',
    body: JSON.stringify({ email }),
  }).then(r => r.json() as Promise<'local' | 'google'>)
}

export const profile = () => {
  return fetch('/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaProfile>)
}

export const update_profile = (_input: RoutesProfileUpdate) => {
  return fetch('/profile', {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  }).then(r => r.json() as Promise<SchemaProfile>)
}

export const set_password = (
  _input: RoutesUpdatePasswordLocal | RoutesUpdatePasswordNolocal,
) => {
  return fetch('/profile/password', {
    method: 'PUT',
    body: JSON.stringify(_input),
  }).then(r => r.json() as Promise<null>)
}
