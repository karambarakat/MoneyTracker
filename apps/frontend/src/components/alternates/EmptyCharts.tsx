import React from 'react'
import AddSvg from '@src/public/undraw_charts.svg'
import { Box, Text } from '@mantine/core'
import dispatch from '@src/redux/dispatch'

function EmptyCharts() {
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
        {"There's No Data Yet."}
      </Text>
      <Text color="#bbb">add more logs to see their statistics</Text>
    </Box>
  )
}

export default EmptyCharts
