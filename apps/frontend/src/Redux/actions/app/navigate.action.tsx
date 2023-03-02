import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { CatDoc } from 'src/types/category'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

import { useEffect } from 'react'
import {
  NavigateFunction,
  NavigateOptions,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import events from 'events'
import { ModalLocation } from '@components/ReactRoute/_type'

const type = 'app:navigate'

export type ActionType = {
  type: typeof type
  return: boolean
  payload: { to: string; option?: NavigateOptions; asModal?: boolean }
}

const event = new events.EventEmitter()

/**
 * put this inside <BrowserRouterc/>
 */
export function NavigateController() {
  const nav = useNavigate()
  const location = useLocation() as any as ModalLocation
  useEffect(() => {
    function fn(args: ActionType['payload'], asModal = false) {
      nav(args.to, {
        ...args.option,
        state: {
          ...args.option?.state,
          from: location.state?.from
            ? location.state.from
            : asModal
            ? location
            : undefined,
        },
      })
    }
    event.on('nav', fn)

    return () => {
      event.removeListener('nav', fn)
    }
  }, [location])

  return <></>
}

const action: actionModule<ActionType> = async function (
  { asModal, ...nav },
  { dispatch, state },
  { pushNoti, online, offline }
) {
  if (event.listenerCount('nav') === 0) {
    console.error('can\'t connect to the app')
    pushNoti({
      display: 'failure',
      message: 'error in navigating to ' + nav.to,
    })
    return false
  }

  nav.option = { state }
  event.emit('nav', nav, asModal)

  return true
}

action.type = type
export default action
