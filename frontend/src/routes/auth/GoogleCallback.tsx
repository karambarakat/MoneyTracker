import { ProfileDoc } from '@redux/types'
import { Text } from '@mantine/core'

import { UserActionTypes } from '@redux/reducers/userReducer'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function GoogleCallback() {
  const dispatch = useDispatch<(action: UserActionTypes) => UserActionTypes>()
  const params = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  )

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + params.token,
      },
    })
      .then((res) => res.json() as Promise<{ data: ProfileDoc }>)
      .then(({ data }) => {
        window.opener._dispatchReact({
          type: 'USER_LOGIN',
          profile: data,
        })
        window.opener._modal()
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
