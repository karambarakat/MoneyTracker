import { Text } from '@mantine/core'
import { USER_WITH_GOOGLE } from '@redux/actions/user'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function GoogleCallback() {
  const dispatch = useDispatch()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    dispatch({
      type: USER_WITH_GOOGLE,
      profile: params.googleProfile,
      token: params.token,
    })

    window.close()
  }, [])
  return (
    <Text>authentication with google succeeded, the page will close soon.</Text>
  )
}

export default GoogleCallback
