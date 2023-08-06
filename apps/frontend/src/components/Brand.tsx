import React from 'react'
import 'twin.macro'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

export default function Brand(p: Props) {
  return (
    <div {...p} aria-label="app logo" tw="m-1 font-light text-3xl">
      myPocket
    </div>
  )
}
