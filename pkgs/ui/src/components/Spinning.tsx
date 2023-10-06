import React from 'react'
import 'twin.macro'
import { ImSpinner8 } from 'react-icons/im'

export default function Spinning() {
  return (
    <div tw="grid place-content-center min-h-full min-w-full">
      <ImSpinner8 tw="animate-spin" />
    </div>
  )
}
