import tw, { styled } from 'twin.macro'
import { WithAsChild } from '../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'

function TextEllipsis(props: WithAsChild) {
  const Component = props.asChild ? Slot : 'div'

  return (
    <Component
      tw="max-w-full text-ellipsis whitespace-nowrap overflow-hidden"
      {...props}
    />
  )
}

export default TextEllipsis
