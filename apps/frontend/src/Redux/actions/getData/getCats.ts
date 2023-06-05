import { useEffect, useMemo } from 'react'
import dispatch from '@src/redux/dispatch'
import { CategoriesState, LogsState, RootState } from '@src/redux/types'
import { useSelector } from 'react-redux'

export default function getCats() {
  const cats = useSelector<RootState, CategoriesState>(s => s.categories)
  useEffect(() => {
    dispatch('category:find', {})
  }, [])
  const memoed = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { rerender: () => {}, empty: cats.length === 0 }
  }, [cats])
  return [cats, memoed] as [typeof cats, typeof memoed]
}
