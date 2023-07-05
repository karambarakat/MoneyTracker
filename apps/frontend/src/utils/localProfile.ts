import { SchemaProfile } from 'types/dist/ts/schema'

export function setProfile(profile: SchemaProfile) {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export function getProfile() {
  const profile = localStorage.getItem('profile')

  if (!profile) return

  return JSON.parse(profile) as SchemaProfile
}
