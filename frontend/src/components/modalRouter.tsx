import { RouterState } from '@interfaces/react-route-dom'
import { Modal } from '@mantine/core'
import { PropsWithChildren } from 'react'
import {
  Routes as NativeRoutes,
  Link as NativeLink,
  useLocation,
  useNavigate,
  LinkProps,
} from 'react-router-dom'

export function Routes({ children }: PropsWithChildren<any>) {
  const location = useLocation()
  const state = location.state as RouterState | null
  const navigate = useNavigate()
  return (
    <>
      <NativeRoutes location={state?.backgroundLocation || location}>
        {children}
      </NativeRoutes>
      {state?.backgroundLocation && (
        <Modal
          opened={true}
          transition="pop"
          transitionDuration={600}
          transitionTimingFunction="ease"
          onClose={() => {
            navigate(-1)
          }}
        >
          <NativeRoutes>{children}</NativeRoutes>
        </Modal>
      )}
    </>
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
      }}
      {...props}
    >
      {props.children}
    </NativeLink>
  )
}
