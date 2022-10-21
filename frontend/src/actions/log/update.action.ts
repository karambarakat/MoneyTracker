import { actionModule } from '../types'

const type = 'log:create'

export type obj = {
  type: typeof type
  num: number
}

const exp: actionModule<obj, string> = {
  type,
  offline: async function ({ num }) {
    console.log('create offline', num)
    return String(num)
  },
  action: async function ({ num }) {
    console.log('create', num)
    return String(num)
  },
  pushNotification: function (rtVal) {
    return {
      message: rtVal + ' was added',
      react: [
        {
          display: 'again',
          action: { type: 'log:create', num: Number(rtVal) + 1 },
        },
      ],
    }
  },
}

export default exp
