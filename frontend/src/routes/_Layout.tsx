import { Box, Button, MantineProvider, Text } from '@mantine/core'
import { Outlet } from 'react-router-dom'

function Main_Layout_Component() {
  return (
    <>
      <Button>Greycliff CF button</Button>
      <Text>hello</Text>
      <Outlet />
    </>
  )
}

export default Main_Layout_Component
