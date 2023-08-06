import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import tw from 'twin.macro'
import { WithAsChild } from '../utils/WithChildren'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'h1' | 'h2'
}

export const fontSizes = {
  sm: tw`text-[0.75rem] font-[400] leading-[1rem] tracking-widest`,
  md: tw`text-[1rem] font-[500] leading-[1.5rem] tracking-wide`,
  lg: tw`text-[1.1875rem] font-[600] leading-[1.8125rem]`,
  h2: tw`text-[1.5rem] font-[400] leading-[2rem]`,
  h1: tw`text-[2rem] font-[600] leading-[2rem]`,
}

type Preferred = 'span' | 'h1' | 'h2'

export default function Text(props: WithAsChild<Props>) {
  const preferred = (
    props.size?.startsWith('h') ? props.size : 'span'
  ) as Preferred

  const Component = props.asChild ? Slot : preferred

  return <Component css={[fontSizes[props.size || 'md']]} {...props} />
}
