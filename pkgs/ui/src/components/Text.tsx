import React from 'react'
import tw from 'twin.macro'

interface Props {
  size: 'sm' | 'md' | 'lg' | 'h1' | 'h2' | 'h3'
}

export const fontSizes = {
  sm: tw`text-[0.75rem] font-[400] leading-[1rem] tracking-widest`,
  md: tw`text-[1rem] font-[500] leading-[1.5rem] tracking-wide`,
  lg: tw`text-[1.1875rem] font-[600] leading-[1.8125rem]`,
  h3: tw`text-[1.5rem] font-[400] leading-[2rem]`,
  h2: tw`text-[2rem] font-[600] leading-[2rem]`,
  h1: tw`text-[2.5rem] font-[700] leading-[3rem] tracking-wide`,
}

export default function (props: JSX.IntrinsicElements['span'] & Props) {
  return <span css={[fontSizes[props.size]]} {...props} />
}
