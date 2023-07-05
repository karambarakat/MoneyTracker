import invalidStateReducerEnhancer from '@redux/extra/invalidStateReducerEnhancer'
import moment from 'moment'
import { Log as LogDoc } from 'types/src/schema'
import { reducerAction, LogsState, ActionsObjects } from './../types'
const initialState: LogsState = []

/**
 * actions
 */
export type LogsTypes =
  | {
      type: 'LOG_ADD_ALL'
      pl: { logs: LogDoc[] }
    }
  | {
      type: 'LOG_ADD_ONE'
      pl: { log: LogDoc }
    }
  | {
      type: 'LOG_UPDATE_ONE'
      pl: { log: LogDoc }
    }
  | {
      type: 'LOG_DELETE_ONE'
      pl: { id: string }
    }

function logReducer(
  state: LogsState = initialState,
  action: reducerAction,
): LogsState {
  switch (action.type) {
    case 'CLEAR_ALL':
      return []
    case 'LOG_ADD_ALL':
      return action.pl.logs.sort(
        (prev, next) =>
          new Date(next.createdAt).getTime() -
          new Date(prev.createdAt).getTime(),
      )
    case 'LOG_ADD_ONE':
      return [action.pl.log, ...state]
    case 'LOG_UPDATE_ONE':
      return state.map(log => {
        if (log._id === action.pl.log._id) return action.pl.log
        return log
      })
    case 'LOG_DELETE_ONE':
      return state.filter(log => log._id !== action.pl.id)
    default:
      return state
  }
}

export default logReducer
