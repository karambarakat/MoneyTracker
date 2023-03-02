import { useEffect, useMemo } from 'react'
import dispatch from '@redux/dispatch'
import { CategoriesState, LogsState, RootState } from '@redux/types'
import { useSelector } from 'react-redux'

export default function getCats() {
  const cats = useSelector<RootState, CategoriesState>((s) => s.categories)
  useEffect(() => {
    dispatch('category:find', {})
  }, [])
  const memoed = useMemo(() => {
    return { rerender: () => {}, empty: cats.length === 0 }
  }, [cats])
  return [cats, memoed] as [typeof cats, typeof memoed]
}
