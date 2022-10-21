import { pushNotification } from '@myHooks/notifications'
import { store } from '@redux/index'
import { MyDispatch, notificationDoc } from '@redux/types'
import isOffline from 'src/utils/isOffline'
import { actionModule, actions } from './types'

const modules = Object.values(import.meta.globEager('./**/*.action.ts'))
  .map((module) => {
    const m: actionModule<any, any> = module.default
    if (!m) throw new Error('no default export in a command')
    if (!m.type) throw new Error('no type in a command')
    if (!m.action) throw new Error('no exec fn in a command')
    return m
  })
  .reduce<Record<string, Omit<actionModule<any, any>, 'type'>>>(
    (acc, { type, ...next }) => {
      if (type in acc) throw new Error('duplicate names')
      acc[type] = next
      return acc
    },
    {}
  )

const action = async function (action: actions) {
  const { type, ...args } = action
  const module = modules[type]

  var rtValue

  if (module.offline && isOffline()) {
    rtValue = await module.offline(args)
  } else {
    rtValue = await module.action(args)
  }

  if (module.pushNotification) {
    const notification = module.pushNotification(rtValue)

    pushNotification(notification)
  }

  return rtValue
}

export default action
