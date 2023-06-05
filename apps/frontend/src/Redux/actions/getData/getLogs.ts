import { useEffect, useMemo } from 'react'
import dispatch from '@src/redux/dispatch'
import { LogsState, RootState } from '@src/redux/types'
import { useSelector } from 'react-redux'

export default function getLogs() {
  const logs = useSelector<RootState, LogsState>(s => s.logs)
  useEffect(() => {
    dispatch('log:find', {})
  }, [])
  const memoed = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { rerender: () => {}, empty: logs.length === 0 }
  }, [logs])
  return [logs, memoed] as [typeof logs, typeof memoed]
}
