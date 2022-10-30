import { Text } from '@mantine/core'
import { pushNotification } from '@myHooks/notifications'
import { useEffect } from 'react'
import { CallbackParams, OpenerFunctions } from 'src/utils/googleSigninTypes'

function GoogleCallback() {
  const params = Object.fromEntries<string>(
    new URLSearchParams(window.location.search).entries()
  ) as unknown as CallbackParams

  useEffect(() => {
    const {
      __$openerFunctionsContext: { action, modal, callback },
    } = window.opener as OpenerFunctions

    pushNotification({ message: `welcome ${params.userName}` })

    action('profile:fetch', { token: params.token }).then(() => {
      callback(params)
      modal()
      window.close()
    })
  }, [])
  return (
    <>
      <Text>Hello {params.userName}</Text>

      <Text>
        authentication with google succeeded, fetching profile information, the
        page will close soon.
      </Text>
    </>
  )
}

export default GoogleCallback
