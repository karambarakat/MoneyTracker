import { setTitle } from '@components/ReactRoute'
import { Box, Select, Stack, Text } from '@mantine/core'
import { store } from '@redux/index'

function Export_Page_Component() {
  setTitle('Setting')

  return (
    <Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>Currency</Text>

        <Select
          placeholder="Pick one"
          onChange={(v) =>
            store.dispatch({ type: 'META_CURRENCY', currency: v || '/d' })
          }
          data={[
            { value: '$/d', label: 'United State Dollar' },
            { value: '/d €', label: 'Euro' },
          ]}
        />
      </Box>
    </Stack>
  )
}

export default Export_Page_Component
