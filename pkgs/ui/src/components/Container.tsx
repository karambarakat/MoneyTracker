import tw, { css, styled } from 'twin.macro'
import { WithAsChild } from '../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

export function Container({ asChild, ...props }: WithAsChild) {
  const Component = asChild ? Slot : 'main'

  return (
    <Component
      css={[
        tw`
          mx-auto 
          px-3 sm:px-4 md:px-5 lg:px-6
          w-[95%] sm:w-[628px] md:w-[756px] lg:w-[1012px]
        `,
      ]}
      {...props}
    />
  )
}

export default Container
