import { setTitle } from '@src/components/ReactRoute/index'
import { Text } from '@mantine/core'
import { Link } from 'react-router-dom'

function About_Page_Component() {
  setTitle('About')

  return (
    <Text>
      Visit Me At My{' '}
      <a target={'_blank'} href={'https://p.karam-dev.com'}>
        <Text component="span" color={'cyan'}>
          Portfolio Page
        </Text>
      </a>
    </Text>
  )
}

export default About_Page_Component
