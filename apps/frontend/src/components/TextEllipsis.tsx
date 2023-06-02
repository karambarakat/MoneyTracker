import { Box } from '@mantine/core'
import React from 'react'

function TextEllipsis({
  children,
  width
}: React.PropsWithChildren<{ width?: number }>) {
  return (
    <Box
      sx={{
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: width ? width + 'px' : 'auto'
      }}
    >
      {children}
    </Box>
  )
}

export default TextEllipsis
