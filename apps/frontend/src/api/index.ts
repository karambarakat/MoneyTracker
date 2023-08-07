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

export const email_status = ({ email }: RoutesEmailStatus) => {
  return fetch(`${import.meta.env.VITE_BACKEND_API}/profile/status`, {
    method: 'GET',
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(handler) as Promise<'local' | 'google'>
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
