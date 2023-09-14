import 'twin.macro'
import React from 'react'
import { getProfile } from '../utils/localProfile'
import { PlugConnected, UserCircle } from 'tabler-icons-react'

export default function UserIcon() {
  const profile = getProfile()

  return (
    <>
      {profile ? (
        <Avatar src={profile.avatar || undefined} />
      ) : (
        <PlugConnected />
      )}
    </>
  )
}

function Avatar({ src }: { src?: string }) {
  const [isError, setIsError] = React.useState(false)
  return (
    <div tw="rounded-full">
      {!isError ? <UserCircle /> : <img src={src}></img>}
    </div>
  )
}
