import type { ReactElement } from 'react'
import dispatch from '@redux/dispatch'
import { RootState, UserState } from '@redux/types'
import { useSelector } from 'react-redux'

export default function OnlineStateAction({
  children
}: {
  children: (t: string) => ReactElement
}) {
  const user = useSelector<RootState, UserState>(s => s.user)
  return (
    <div
      onClick={() => {
        user.onlineState
          ? dispatch('user:offline', {})
          : dispatch('user:online', {})
      }}
    >
      {children(user.onlineState ? 'Go Offline' : 'Go Online')}
    </div>
  )
}
