import { setTitle } from '@src/routes/_MetaContext'
import { Text } from '@mantine/core'

function E404_Page_Component() {
  setTitle('')

  return <Text>404 - not found</Text>
}

export default E404_Page_Component
