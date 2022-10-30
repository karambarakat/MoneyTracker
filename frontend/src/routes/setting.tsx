import { setTitle } from '@components/ReactRoute'
import { Box, Select, Stack, Text } from '@mantine/core'
import { store } from '@redux/index'
import { MetaState, RootState } from '@redux/types'
import { useSelector } from 'react-redux'

function Export_Page_Component() {
  setTitle('Setting')
  const { currency } = useSelector<RootState, MetaState>((s) => s.meta)

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
          onChange={(c) =>
            store.dispatch({
              type: 'META_CURRENCY',
              pl: { currency: c || '/d' },
            })
          }
          value={currency}
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
