import 'twin.macro'
import React from 'react'
import { profile } from '../utils/localStorage'
import { PlugConnected, UserCircle } from 'tabler-icons-react'

export default function UserIcon() {
  return (
    <>
      {profile ? (
        <Avatar src={profile.getItem()?.avatar || undefined} />
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
