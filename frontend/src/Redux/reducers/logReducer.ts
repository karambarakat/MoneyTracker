import moment from 'moment'
import { LogDoc, LogsState } from './../types'
const initialState: LogsState = []

/**
 * actions
 */
export type LogsActionTypes =
  | {
      type: 'LOG_ADD_ALL'
      logs: LogDoc[]
    }
  | {
      type: 'LOG_ADD_ONE'
      log: LogDoc
    }
  | {
      type: 'LOG_UPDATE_ONE'
      log: LogDoc
    }
  | {
      type: 'LOG_DELETE_ONE'
      id: string
    }

export default function logReducer(
  state: LogsState = initialState,
  action: LogsActionTypes
): LogsState {
  switch (action.type) {
    case 'LOG_ADD_ALL':
      return action.logs.sort(
        (prev, next) =>
          new Date(next.createdAt).getTime() -
          new Date(prev.createdAt).getTime()
      )
    case 'LOG_ADD_ONE':
      return [action.log, ...state]
    case 'LOG_UPDATE_ONE':
      return state.map((log) => {
        if (log._id === action.log._id) return action.log
        return log
      })
    case 'LOG_DELETE_ONE':
      return state.filter((log) => log._id !== action.id)

    default:
      return state
  }
}
