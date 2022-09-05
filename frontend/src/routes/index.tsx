import AddLog from '@components/AddLog'
import AddLogButton from '@components/AddLogButton'
import { Button, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

function Index_Page_Component() {
  return (
    <Stack>
      {/* <AddLog /> */}
      {[].map((e) => (
        <div>hello</div>
      ))}

      <AddLogButton />
    </Stack>
  )
}

export default Index_Page_Component
