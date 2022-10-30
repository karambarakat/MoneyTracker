import { actionFunction } from 'src/actions'
import { apiGoogleCallbackParams } from 'src/types/user'

export interface CallbackParams extends apiGoogleCallbackParams {}

export type OpenerFunctions = {
  __$openerFunctionsContext: {
    action: actionFunction
    modal: () => void
  }
}
