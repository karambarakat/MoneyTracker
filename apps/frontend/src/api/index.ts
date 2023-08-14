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
import { getProfile } from '../utils/localProfile'
import HttpError from 'types/dist/helpers/http_error'

export const find_log = (pagination: { page: number; pageSize: number }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/log`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(re => handler(re) as SchemaLogOut[])
    .then(data => paged(data, pagination))
}

enum queryAPI {
  find_log = 'find_log',
}

export const find_one_log = ({ _id }: { _id: string }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/log/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaLogOut>
}

enum queryAPI {
  find_one_log = 'find_one_log',
}

export const create_log = (_input: SchemaLogIn) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/log`, {
    method: 'POST',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaLogOut>
}

enum mutationAPI {
  create_log = 'create_log',
}

export const update_log = ({
  _id,
  ..._input
}: { _id: string } & SchemaLogIn) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/log/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaLogOut>
}

enum mutationAPI {
  update_log = 'update_log',
}

export const delete_log = ({ _id }: { _id: string }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/log/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<null>
}

enum mutationAPI {
  delete_log = 'delete_log',
}

export const find_category = () => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaCategoryOut[]>
}

enum queryAPI {
  find_category = 'find_category',
}

export const find_one_category = ({ _id }: { _id: string }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category/${_id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaCategoryOut>
}

enum queryAPI {
  find_one_category = 'find_one_category',
}

export const create_category = (_input: SchemaCategoryIn) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category`, {
    method: 'POST',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaCategoryOut>
}

enum mutationAPI {
  create_category = 'create_category',
}

export const update_category = ({
  _id,
  ..._input
}: { _id: string } & Partial<SchemaCategoryIn>) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category/${_id}`, {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaCategoryOut>
}

enum mutationAPI {
  update_category = 'update_category',
}

export const delete_category = ({ _id }: { _id: string }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<null>
}

enum mutationAPI {
  delete_category = 'delete_category',
}

export const find_all_logs_by_category = ({ _id }: { _id: string }) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/category/${_id}/logs`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaLogOut[]>
}

enum queryAPI {
  find_all_logs_by_category = 'find_all_logs_by_category',
}

export const register = ({
  email,
  password,
  ...body
}: RoutesAuthLocalLogin & RoutesAuthLocalRegister) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/auth/local/register`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaProfile>
}

enum mutationAPI {
  register = 'register',
}

export const login = ({ email, password }: RoutesAuthLocalLogin) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/auth/local/login`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaProfile>
}

enum mutationAPI {
  login = 'login',
}

export const email_status = ({ email }: RoutesEmailStatus) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/profile/status`, {
    method: 'GET',
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(handler) as Promise<'local' | 'google'>
}

enum queryAPI {
  email_status = 'email_status',
}

export const profile = () => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaProfile>
}

enum queryAPI {
  profile = 'profile',
}

export const update_profile = (_input: RoutesProfileUpdate) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/profile`, {
    method: 'PUT',
    body: JSON.stringify(_input),
    headers: {
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
    .then(res => res.json())
    .then(handler) as Promise<SchemaProfile>
}

enum mutationAPI {
  update_profile = 'update_profile',
}

export const set_password = (
  _input: RoutesUpdatePasswordLocal | RoutesUpdatePasswordNolocal,
) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/profile/password`, {
    method: 'PUT',
    body: JSON.stringify(_input),
  })
    .then(res => res.json())
    .then(handler) as Promise<null>
}

enum mutationAPI {
  set_password = 'set_password',
}

declare global {
  namespace API {
    export { mutationAPI, queryAPI }
  }
}

// export { mutationAPI, queryAPI }

// helpers

// hack until backend is fixed
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

function handler(res: any) {
  const { data, error } = res
  if (error && error !== 'null') {
    throw new HttpError(error)
  }
  return data
}
