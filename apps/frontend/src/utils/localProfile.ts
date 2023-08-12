import { useEffect, useState } from 'react'
import { Jwt } from 'types/dist/ts/api'
import { SchemaProfile } from 'types/dist/ts/schema'

const event = new EventTarget()

export function setProfile(profile: SchemaProfile | undefined) {
  if (!profile) localStorage.removeItem('profile')
  else localStorage.setItem('profile', JSON.stringify(profile))
  event.dispatchEvent(new Event('update'))
}

export function getProfile() {
  const profile = localStorage.getItem('profile')

  if (!profile) return

  return JSON.parse(profile) as SchemaProfile
}

export function useProfile() {
  const [profile, setProfile] = useState(() => getProfile())
  useEffect(() => {
    const handler = () => {
      setProfile(getProfile())
    }
    event.addEventListener('update', handler)
    return () => {
      event.removeEventListener('update', handler)
    }
  }, [])

  return profile
}

class _Token {
  constructor(public token: string) {
    this.token = token
  }

  expired() {
    if (!this.token) return false

    return (
      (JSON.parse(atob(this.token.split('.')[1])) as Jwt).exp <
      Date.now() / 1000
    )
  }
}

export function Token(token: string) {
  return new _Token(token)
}
