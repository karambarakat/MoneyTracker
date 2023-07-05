import { Paper, PaperProps } from '@mantine/core'
import React from 'react'

function MyPaper(props: PaperProps) {
  return <Paper shadow={'xs'} p={32} {...props} />
}

export default MyPaper
