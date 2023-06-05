import { Box, Text } from '@mantine/core'
import LogoPng from '@src/public/logo.png'
import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link to={'/'}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <img src={LogoPng} width={32} height={32} />
        <Text size="xl" weight={500}>
          myPocket
        </Text>
      </Box>
    </Link>
  )
}

export default Brand
