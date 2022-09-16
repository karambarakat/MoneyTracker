import { Box } from '@mantine/core'
import React from 'react'
import { X } from 'tabler-icons-react'

function Dismissible({
  children,
  refresh,
  onclose,
}: React.PropsWithChildren<{ refresh?: any; onclose?: () => void }>) {
  const [opened, setOpened] = React.useState(false)
  const firstTile = React.useRef(true)

  React.useEffect(() => {
    if (typeof refresh === 'undefined') return
    !firstTile.current && setOpened(true)
  }, [refresh])

  React.useEffect(() => {
    firstTile.current = false
  })

  return !opened ? null : (
    <Box
      p={12}
      mx={12}
      sx={(th) => ({
        backgroundColor: th.colors?.gray[0] || 'gray',
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Box sx={{ cursor: 'pointer' }}>
          <X
            color="gray"
            onClick={() => {
              setOpened(false)
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
