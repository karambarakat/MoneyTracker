import { useState, useEffect } from 'react'
import events, { Listener } from 'events'
import type { EventEmitter } from 'events'
import { v4 as uuid } from 'uuid'
import { dispatchTupleArg } from '@redux/dispatch'

export interface ReactionI {
  display: string
  dispatch: dispatchTupleArg
  style?: {
    color: string
  }
}

/**
 * notification object required in `pushNotification` function
 */
export interface notification {
  message: string
  display?: 'success' | 'failure'
  reactions?: (ReactionI | undefined)[]
}

// @ts-ignore
interface notificationEvent extends EventEmitter {
  emit(type: 'pushNotification', noti: notification): boolean
  emit(type: 'dismissNotification', noti: string): boolean

  on(type: 'pushNotification', callback: (noti: notification) => void): this
  on(type: 'dismissNotification', callback: (id: string) => void): this
}

const event: notificationEvent = new events.EventEmitter()

/**
 * all functions required to interact with the notification system
 */
export const pushNotification = (notification: notification) =>
  event.emit('pushNotification', notification)

export const dismissNotification = (id: string) =>
  event.emit('dismissNotification', id)

// export const updateNotification
// export const cleanNotifications
// export const cleanNotificationsQueue

/**
 * helper class to use inside useEffect>useNotification
 */
class Listeners {
  all: Array<{ cb: Listener; type: string }> = []
  on: notificationEvent['on'] = (type: string, cb: Listener) => {
    this.all.push({ cb, type })
    return event.on(
      // @ts-ignore
      type,
      cb,
    )
  }
  remove() {
    this.all.forEach(elem => {
      event.removeListener(elem.type, elem.cb)
    })
  }
}

/**
 * useNotification hook
 */
interface notiState extends notification {
  id: string
}

/**
 *
 */
export const useNotification = () => {
  const [state, setState] = useState<notiState[]>([])

  useEffect(() => {
    const event = new Listeners()

    event.on('dismissNotification', id => {
      setState(old => old.filter(_noti => _noti.id !== id))
    })

    event.on('pushNotification', noti => {
      const id = uuid()
      setState(old => [...old, { ...noti, id }])
      setTimeout(() => {
        setState(old => old.filter(_noti => _noti.id !== id))
      }, 7500)
    })

    return () => {
      event.remove()
    }
  }, [])

  return state
}
