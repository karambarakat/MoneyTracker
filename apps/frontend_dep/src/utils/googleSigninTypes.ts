import { dispatchSugarFunction } from '@redux/dispatch'
import { apiGoogleCallbackParams } from 'types/src/api/callback'

export type CallbackParams = apiGoogleCallbackParams

export type OpenerFunctions = {
  __$openerFunctionsContext: {
    callback: (params: CallbackParams) => Promise<void>
  }
}
