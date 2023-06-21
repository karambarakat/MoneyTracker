import { PropsOf } from '@emotion/react'
import React from 'react'
import tw, { styled } from 'twin.macro'

const Divider = styled.div`
  ${tw`min-w-[1px] min-h-[1px] self-stretch bg-slate-300/40 dark:bg-slate-700/70`}
`

export default Divider

export const DividerWithLabel = function ({
  children,
  labelPosition,
  ...props
}: PropsOf<typeof Divider> & {
  children?: React.ReactNode
  labelPosition?: 'left' | 'center' | 'right'
}) {
  return (
    <div tw="flex gap-3" {...props}>
      {labelPosition !== 'left' && <Divider tw="flex-1 self-center" />}
      <div>{children}</div>
      {labelPosition !== 'right' && <Divider tw="flex-1 self-center" />}
    </div>
  )
}
