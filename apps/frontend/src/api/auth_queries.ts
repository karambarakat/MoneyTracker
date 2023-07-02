import { mutation, query } from '@src/utils/fetch_'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  register,
  login,
  email_status,
  profile,
  update_profile,
  set_password,
} from '.'

export const useRegister = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(register),
    onSettled: () => {
      client.invalidateQueries(['profile'])
    },
  })

  return mutate
}

export const useLogin = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(login),
    onSettled: () => {
      client.invalidateQueries(['profile'])
    },
  })

  return mutate
}

export const useEmailStatus = (email: string) => {
  const _query = useQuery({
    queryKey: ['profile'],
    queryFn: query(email_status({ email: email })),
  })
  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useProfile = () => {
  const _query = useQuery({
    queryKey: ['profile'],
    queryFn: query(profile()),
  })
  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useUpdateProfile = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(update_profile),
    onSettled: () => {
      client.invalidateQueries(['profile'])
    },
  })

  return mutate
}

export const useSetPassword = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(set_password),
    onSettled: () => {
      client.invalidateQueries(['profile'])
    },
  })

  return mutate
}
