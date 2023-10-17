import 'twin.macro'
import { Slot } from '@radix-ui/react-slot'
import { WithAsChild } from '../utils/WithChildren'

export default function Hoverable({ asChild, ...props }: WithAsChild) {
  const Component = asChild ? Slot : 'div'
  return (
    <Component
      tw="hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
      {...props}
    />
  )
}

export function HoverableLighter({ asChild, ...props }: WithAsChild) {
  const Component = asChild ? Slot : 'div'
  return (
    <Component
      tw="hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-[#2d3a4b] dark:active:bg-[#2a3748]"
      {...props}
    />
  )
}
