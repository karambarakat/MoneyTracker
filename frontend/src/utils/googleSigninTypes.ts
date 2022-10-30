import { dispatchSugarFunction } from '@redux/dispatch'
import { apiGoogleCallbackParams } from 'src/types/user'

export interface CallbackParams extends apiGoogleCallbackParams {}

export type OpenerFunctions = {
  __$openerFunctionsContext: {
    callback: (params: CallbackParams) => Promise<void>
  }
}
