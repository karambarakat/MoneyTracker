import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const iconQuery = async () => {
  const res = await import('./icons')

  return res.default.split('\n') as string[]
}

/**
 *
 * @param whichOne select specific icon or return all icons
 */
export function useIcon(whichOne: string) {
  const res = useQuery({
    queryFn: iconQuery,
    suspense: false,
    queryKey: ['icons'],
    cacheTime: 1000 * 60 * 60 * 24,
  }) as UseQueryResult<string>
  // return data of type string please

  const validIndex = useMemo(() => {
    const target = Number(whichOne)

    if (isNaN(target) || target > 876 || target < 0)
      return new Error('Invalid index')

    return target
  }, [whichOne])

  if (validIndex instanceof Error) return validIndex

  if (res.status === 'success')
    return { status: 'success', data: res.data[validIndex] }

  return res
}

export const defaultValue =
  'm38.49,32h-14.49V8h24v18h-6.04l-3.46,6Zm-18.49,4v-14c-7.73,0-14,6.27-14,14s6.27,14,14,14,14-6.27,14-14h-14Zm27.73-6h-3.46l-12.12,21c.77,1.33.96,1.67,1.73,3h24.25c.77-1.33.96-1.67,1.73-3l-12.12-21Z'
