import { MetaState, RootState } from '@redux/types'
import React from 'react'
import { useSelector } from 'react-redux'

function Amount({ a }: { a: number }) {
  const { currency } = useSelector<RootState, MetaState>((s) => s.meta)
  const content = React.useMemo(
    () => currency.replace('/d', a.toString()),
    [currency]
  )

  return <span>{content}</span>
}

export default Amount
