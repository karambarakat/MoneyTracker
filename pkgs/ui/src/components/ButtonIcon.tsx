import React from 'react'
import { PropsOf } from '@emotion/react'
import ButtonBase from './Button'
import tw from 'twin.macro'
import { Slot } from '@radix-ui/react-slot'
import { WithAsChild } from '../utils/WithChildren'

const sizes = {
  sm: tw`w-[18px] h-[18px] min-h-[18px] min-w-[18px] p-[4px]`,
  md: tw`w-[30px] h-[30px] min-h-[30px] min-w-[30px] p-[4px]`,
  lg: tw`w-[44px] h-[44px] min-h-[44px] min-w-[36px] p-[6px]`,
  null: tw``,
}

const base = tw`flex items-center justify-center`

interface Props extends PropsOf<typeof ButtonBase> {
  label: string
}

export default function ButtonIcon({
  label,
  asChild,
  ...props
}: WithAsChild<Props>) {
  const Component = asChild ? Slot : 'button'

  return (
    <ButtonBase css={[base, sizes[props.size || 'md']]} {...props} asChild>
      <Component aria-label={label}>{props.children}</Component>
    </ButtonBase>
  )
}
