import { dispatchSugarFunction } from '@redux/dispatch'
import { apiGoogleCallbackParams } from 'src/types/user'

export type CallbackParams = apiGoogleCallbackParams

export type OpenerFunctions = {
  __$openerFunctionsContext: {
    callback: (params: CallbackParams) => Promise<void>
  }
}
