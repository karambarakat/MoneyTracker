import { dispatchSugarFunction } from '@redux/dispatch'
import { apiGoogleCallbackParams } from 'types/api/callback'

export type CallbackParams = apiGoogleCallbackParams

export type OpenerFunctions = {
  __$openerFunctionsContext: {
    callback: (params: CallbackParams) => Promise<void>
  }
}
