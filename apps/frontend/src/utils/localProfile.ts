import { useEffect, useState } from 'react'
import { Jwt_ } from 'types/backend'
import { User } from 'types/gql/graphql'

const event = new EventTarget()

export type Profile = Omit<User, 'createdAt' | 'updatedAt' | '__typename'>

export function setProfile(profile: Profile | undefined) {
  if (!profile) localStorage.removeItem('profile')
  else localStorage.setItem('profile', JSON.stringify(profile))
  event.dispatchEvent(new Event('update'))
}

export function setToken(token: string) {
  localStorage.setItem('token', token)
}

export function getToken() {
  const token = localStorage.getItem('token')

  if (!token) return

  return token
}

export function getProfile() {
  const profile = localStorage.getItem('profile')

  if (!profile) return

  return JSON.parse(profile) as Profile
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
      Number((JSON.parse(atob(this.token.split('.')[1])) as Jwt_).exp) <
      Date.now() / 1000
    )
  }
}

export function Token(token: string) {
  return new _Token(token)
}
