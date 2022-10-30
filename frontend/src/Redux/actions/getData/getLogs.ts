import { useEffect, useMemo } from 'react'
import dispatch from '@redux/dispatch'
import { LogsState, RootState } from '@redux/types'
import { useSelector } from 'react-redux'

export default function getLogs() {
  const logs = useSelector<RootState, LogsState>((s) => s.logs)
  useEffect(() => {
    dispatch('log:find', {})
  }, [])
  const memoed = useMemo(() => {
    return { rerender: () => {}, empty: logs.length === 0 }
  }, [logs])
  return [logs, memoed] as [typeof logs, typeof memoed]
}
