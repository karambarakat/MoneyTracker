import { useEffect, useState } from 'react'
import { Jwt_ } from 'types/backend'
import { User } from 'types/gql/graphql'

const eventTarget = new EventTarget()

class LocalItem<T> {
  /**
   * @private
   */
  _item: T | undefined
  key: string
  constructor(key: string) {
    this.key = key
    const localItem = localStorage.getItem(key)
    this._item = localItem ? JSON.parse(localItem as string) : undefined
  }

  setItem(item: T | undefined) {
    if (!item) localStorage.removeItem(this.key)
    else localStorage.setItem(this.key, JSON.stringify(item))

    this._item = item

    // React
    eventTarget.dispatchEvent(new Event(this.key))
  }

  getItem() {
    const item = localStorage.getItem(this.key)

    if (!item) return

    return JSON.parse(item) as T
  }

  use() {
    const [item, setItem] = useState<LocalItem<T>>(this)

    useEffect(() => {
      const handler = () => setItem(new LocalItem(this.key))
      eventTarget.addEventListener(this.key, handler)
      return () => eventTarget.removeEventListener(this.key, handler)
    }, [])

    return item
  }
}

export const profile = new LocalItem<User>('profile')

export const token = Object.assign(new LocalItem<string>('token'), {
  valid(this: LocalItem<string>) {
    const item = this.getItem()

    if (!item) return false

    return (
      Number((JSON.parse(atob(item.split('.')[1])) as Jwt_).exp) >=
      Date.now() / 1000
    )
  },
})
