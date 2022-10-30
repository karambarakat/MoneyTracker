// import { UserDoc } from '@redux/types'
import { httpErrorHandler } from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:status'

/**
 * 
export type args = {
  type: typeof type; return: UserDoc;
   
  payload: {
  email: string
}}
 
const action: actionModule<args,  UserDoc> = async function (
 values,
  { dispatch, state },
  { pushNoti, online }
) {
    const res = await fetch(
      import.meta.env.VITE_BACKEND_API + '/profile/status',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    )
    const data:  UserDoc = await res.json().then(httpErrorHandler)

    return data
  // },
  // offline: async function (argg) {
  //   throw new Error('offline')
  // },
}

action.type = type;export default action


* 
 */
