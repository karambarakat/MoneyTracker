import React from 'react'
import 'twin.macro'

interface Props {
  children: React.ReactNode
}

export default function ({ children }: Props) {
  return <span>{children}</span>
}
