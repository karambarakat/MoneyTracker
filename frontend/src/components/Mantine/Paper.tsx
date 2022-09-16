import React, { PropsWithChildren } from 'react'
import { Paper as NativePaper, PaperProps } from '@mantine/core'

function Paper({ children, ...props }: PropsWithChildren<PaperProps>) {
  return (
    <NativePaper shadow={'xs'} p={'sm'} {...props}>
      {children}
    </NativePaper>
  )
}

export default Paper
