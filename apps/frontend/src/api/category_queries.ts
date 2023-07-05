import { InputOfAction, mutation, query } from '@src/lib/react-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  create_category,
  delete_category,
  find_category,
  find_one_category,
  update_category,
} from '.'

export const useCategories = () => {
  const _query = useQuery({
    queryKey: ['categories'],
    queryFn: query(find_category()),
  })

  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useCategory = (_id: string) => {
  const _query = useQuery({
    queryKey: ['Category', _id],
    queryFn: query(find_one_category({ _id })),
  })

  if (!_query.data) throw new Error('suspense missing?')

  return _query
}

export const useCreateCategory = () => {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: mutation(create_category),
    onSettled: () => {
      client.invalidateQueries(['categories'])
    },
  })

  return mutate
}

export const useDeleteCategory = () => {
  const client = useQueryClient()
  const _query = useMutation({
    mutationFn: mutation(delete_category),
    onSettled: (_, err, vars: InputOfAction<typeof delete_category>) => {
      client.invalidateQueries(['categories', [vars._id]])
      client.invalidateQueries(['categories'])
    },
  })

  return _query
}

export const useUpdateCategory = () => {
  const client = useQueryClient()
  const _query = useMutation({
    mutationFn: mutation(update_category),
    onSuccess: (_, vars: any) => {
      client.invalidateQueries(['categories'])
      client.invalidateQueries(['Category', vars._id])
    },
  })

  return _query
}
