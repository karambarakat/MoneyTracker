import { Profile } from 'types/src/schema'
import { profile_update } from 'types/src/api/routes/profile'
import { actionModule } from '../../dispatch'

const type = 'profile:update'

export type ActionType = {
  type: typeof type
  return: Profile

  payload: profile_update
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline },
) {
  const profile = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token(),
      },
      body: JSON.stringify(values),
    }),
  )
  dispatch({
    type: 'USER_ADD_PROFILE',
    pl: { profile },
  })

  return profile
  // },
  // offline: async function (argg) {
  //   throw new Error('offline')
  // },
  // pushNotification: function (doc) {
  //   return {
  //     message: 'Welcome ' + doc.displayName,
  //     reactions: [],
  //   }
  // },
}

action.type = type
export default action
