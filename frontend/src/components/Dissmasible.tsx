import { Box } from '@mantine/core'
import React from 'react'
import { X } from 'tabler-icons-react'

function Dismissible({
  children,
  opened,
  onclose,
}: React.PropsWithChildren<{
  opened: boolean
  onclose?: () => void
}>) {
  const firstTile = React.useRef(true)

  // React.useEffect(() => {
  //   if (typeof refresh === 'undefined') return
  //   !firstTile.current && setOpened(true)
  // }, [refresh])

  // React.useEffect(() => {
  //   firstTile.current = false
  // })

  return !opened ? null : (
    <Box
      p={12}
      mx={12}
      sx={(th) => ({
        backgroundColor:
          th.colorScheme === 'light'
            ? th.colors?.gray[0] || 'gray'
            : th.colors?.gray[9] || 'gray',
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Box sx={{ cursor: 'pointer' }}>
          <X
            color="gray"
            onClick={() => {
              onclose && onclose()
            }}
          />
        </Box>
      </Box>
      {children}
    </Box>
  )
}

export default Dismissible
