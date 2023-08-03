import { SerializedStyles } from '@emotion/react'
import { NavLinkProps, LinkProps, NavLink, Link } from 'react-router-dom'
import { TwStyle, css } from 'twin.macro'
import { stylable } from 'twin.macro'
import { WithChildren } from 'ui/src/utils/WithChildren'

/**
 * this is just a wrapper around `react-router-doc` NavLink
 * 1. provide standard way to style isPending and isActive states
 * 2. limit changing http a element's props, use Slot instead
 * @example
 * ```tsx
   <Slot aria-atomic={true}>
     <INavLink to={'/'} Styles={{ isActive: tw`text-pink-200` }}>
       test
     </INavLink>
   </Slot>
 * ```
 */
export function INavLink({
  children,
  Styles,
  ...props
}: WithChildren<
  Omit<NavLinkProps, keyof React.AnchorHTMLAttributes<HTMLAnchorElement>> & {
    Styles?: {
      isPending?: stylable
      isActive?: stylable
    }
  }
>) {
  return (
    <NavLink
      css={{
        '&.active': Styles?.isActive || '',
        '&.pending': Styles?.isPending || '',
      }}
      className={({ isActive, isPending }) => {
        return isActive ? 'active' : isPending ? 'pending' : ''
      }}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export function ILink({
  ...props
}: WithChildren<
  Omit<LinkProps, keyof React.AnchorHTMLAttributes<HTMLAnchorElement>>
>) {
  return <Link {...props} tw="text-primary-600 dark:text-primary-300" />
}
