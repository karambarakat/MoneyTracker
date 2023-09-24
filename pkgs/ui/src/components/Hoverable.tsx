import 'twin.macro'
import { Slot } from '@radix-ui/react-slot'
import { WithAsChild } from '../utils/WithChildren'

export default function Hoverable(props: WithAsChild) {
  const Component = props.asChild ? Slot : 'div'
  return (
    <Component
      tw="hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
      {...props}
    >
      {props.children}
    </Component>
  )
}
