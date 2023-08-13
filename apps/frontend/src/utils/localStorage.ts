import { useEffect, useState } from 'react'
import { SchemaProfile } from 'types/dist/ts/schema'

export interface LocalStorage {
  profile: SchemaProfile
  hmm: string
}

const event = new EventTarget()

export function useLocal(key: keyof LocalStorage) {
  const [internal, setInternal] = useState(() => getLocal(key))
  useEffect(() => {
    const handler = () => setInternal(getLocal(key))

    event.addEventListener('update:' + key, handler)

    return () => {
      event.removeEventListener('update:' + key, handler)
    }
  }, [])

  return internal
}

export function getLocal<T extends keyof LocalStorage>(key: T) {
  const profile = localStorage.getItem(key)

  if (!profile) return

  return JSON.parse(profile) as LocalStorage[T]
}

export function setLocal<T extends keyof LocalStorage>(
  key: T,
  value: LocalStorage[T] | undefined,
) {
  if (!value) localStorage.removeItem('profile')
  else localStorage.setItem('profile', JSON.stringify(value))

  event.dispatchEvent(new Event('update:' + key))
}
