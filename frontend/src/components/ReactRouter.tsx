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
 * todo: maybe the only thing I have to have in the context is goBack && from
 * I'm thinking of making this context universal for navigating whether it is modal or protected route
 */
interface Context {
  readonly close: () => void
  readonly open: () => void
  readonly toggle: () => void
  readonly goBack: () => void
  backgroundLocation: undefined | Location
}
const context = createContext<Context>({
  close: () => {},
  open: () => {},
  toggle: () => {},
  goBack: () => {},
  backgroundLocation: undefined,
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
    location.state?.backgroundLocation && fns.open()
  }, [location.state?.backgroundLocation])

  return (
    <context.Provider
      value={{
        backgroundLocation: location.state?.backgroundLocation,
        ...fns,
        goBack: fns['close'],
      }}
    >
      <NativeRoutes location={location.state?.backgroundLocation || location}>
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
  return (
    <NativeLink
      state={{
        ...(props.state || {}),
        backgroundLocation: as_modal ? location : undefined,
        from: as_modal ? location : undefined,
      }}
      {...props}
    >
      {props.children}
    </NativeLink>
  )
}
