import { Button, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

function Index_Page_Component() {
  return (
    <Text>
      hello world{' '}
      <Link to={'/about'}>
        <Button>click me</Button>
      </Link>
    </Text>
  )
}

export default Index_Page_Component
