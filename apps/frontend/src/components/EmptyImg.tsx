import { WithAsChild } from 'ui/src/utils/WithChildren'
import 'twin.macro'
import AddSvg from '../public/undraw_add.svg'
import { Slot } from '@radix-ui/react-slot'

export default function EmptyImg({ asChild, ...props }: WithAsChild) {
  const Component = asChild ? Slot : 'img'
  return (
    <Component
      tw="w-[200px] max-w-full"
      src={AddSvg}
      alt="add new entry"
      {...props}
    />
  )
}
