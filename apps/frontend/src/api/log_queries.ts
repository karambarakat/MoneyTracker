import { mutation, pagedQuery, query } from '@src/lib/react-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create_log, delete_log, find_log, find_one_log, update_log } from '.'

export const useLogs = (pagination: { page: number; pageSize: number }) => {
  const _query = useQuery({
    queryKey: ['logs', pagination],
    queryFn: pagedQuery(find_log(), pagination),
    keepPreviousData: true,
  })

  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useLog = (_id: string) => {
  const _query = useQuery({
    queryKey: ['log', _id],
    queryFn: query(find_one_log({ _id })),
  })

  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useCreateLog = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(create_log),
    onSettled: () => {
      client.invalidateQueries(['logs'])
    },
  })

  return mutate
}

export const useDeleteLog = () => {
  const client = useQueryClient()
  const _query = useMutation({
    mutationFn: mutation(delete_log),
    onSuccess: (_, vars: any) => {
      client.invalidateQueries(['logs'])
      client.invalidateQueries(['logs', [vars._id]])
    },
  })

  return _query
}

export const useUpdateLog = () => {
  const client = useQueryClient()
  const _query = useMutation({
    mutationFn: mutation(update_log),
    onSuccess: (_, vars: any) => {
      client.invalidateQueries(['logs'])

      client.invalidateQueries(['log', vars._id])
    },
  })

  return _query
}
