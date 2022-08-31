import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'
import {
  Routes as NativeRoutes,
  Link as NativeLink,
  useLocation,
  useNavigate,
  LinkProps,
  Location,
} from 'react-router-dom'
// import type { Location } from 'react-router-dom'

/**
 * exit method will go back to the normal routes
 * for Modal navigation this will close the modal
 * for protected route this will go to the last page visited before entering to the auth
 */
interface Context {
  readonly exit: () => void
}
const context = createContext<Context>({
  exit: () => {},
})

export const useRoutes = () => useContext(context)

export function Routes({ children }: PropsWithChildren<any>) {
  const location = useLocation()

  const [open, fns] = useDisclosure(false, {
    onClose: () => {
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', {
          replace: true,
        })
      }, 500)
    },
  })
  const navigate = useNavigate()
  useEffect(() => {
    location.state?.from && fns.open()
  }, [location.state?.from])

  return (
    <context.Provider
      value={{
        exit: fns['close'],
      }}
    >
      <NativeRoutes location={location.state?.from || location}>
        {children}
      </NativeRoutes>

      <Modal
        opened={open}
        transition="pop"
        transitionDuration={600}
        transitionTimingFunction="ease"
        onClose={fns.close}
      >
        <div>
          <NativeRoutes>{children}</NativeRoutes>
        </div>
      </Modal>
    </context.Provider>
  )
}
export function Link({
  as_modal,
  ...props
}: LinkProps & { as_modal?: boolean }) {
  const location = useLocation()
  location.state?.from
  return (
    <NativeLink
      state={{
        ...(props.state || {}),
        from: location.state?.from
          ? location.state.from
          : as_modal
          ? location
          : undefined,
      }}
      {...props}
    >
      {props.children}
    </NativeLink>
  )
}
