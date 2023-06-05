import React from 'react'
import AddSvg from '@src/public/undraw_login.svg'
import { Box, Text } from '@mantine/core'
import { useSelector } from 'react-redux'
import { RootState, UserState } from '@src/redux/types'

function NoUser() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '3rem'
      }}
    >
      <img src={AddSvg} width="70%" />
      <Text
        // @ts-ignore
        size={'2rem'}
        color="#aaa"
        weight="bold"
      >
        {"You're not signed in"}
      </Text>
      {/* <Text color='#bbb'>{props.body || ''}</Text> */}
    </Box>
  )
}

export default NoUser
