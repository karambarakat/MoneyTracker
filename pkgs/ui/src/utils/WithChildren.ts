import { ReactNode } from 'react'

export type WithChildren<T extends object | '_empty' = '_empty'> =
  T extends '_empty'
    ? { children?: React.ReactNode }
    : { children?: React.ReactNode } & T

export type WithAsChild<T extends object | '_empty' = '_empty'> =
  T extends '_empty'
    ? { children?: ReactNode; asChild?: boolean }
    : { children?: ReactNode; asChild?: boolean } & T

/** use example 
import { Slot } from '@radix-ui/react-slot'

export function Button(p: WithAsChild) {
  const Component = p.asChild ? Slot : "button"
  return ( 
    <Component tw="to-be-overridden" {...p} aria-label="to be overridden">
      to be overridden
    </Component>
  )
}
----------------
<Button tw="tw-can-only-be-overridden-here" asChild>
  <a href="override" aria-label="override">override</a>
</Button>
 */

export type WithComponent<
  RequiredProps extends object,
  T extends object | '_empty' = '_empty',
> = T extends '_empty'
  ? { children?: (props: RequiredProps) => JSX.Element }
  : {
      children?: (props: RequiredProps) => JSX.Element
    } & T

/** use example 
export function Button(p: WithComponent<required>) {
  const Component = p.children ?? ((p: required) => <div {...p} />)
  return ( 
    <Component tw="to-be-overridden" {...p} aria-label="to be overridden">
      to be overridden
    </Component>
  )
}
----------------
<Button tw="tw-can-only-be-overridden-here">
  {p => <span {...p} aria-label="override" children="override" />}
</Button>
 */
