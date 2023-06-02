import { Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { MetaState, RootState } from '@redux/types'
import { PropsWithChildren, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  useLocation,
  useNavigate,
  Routes as NativeRoutes
} from 'react-router-dom'
import { context } from './goBack'
import { getTitle } from './Page'
import { ModalLocation } from './_type'

export default function Routes({ children }: PropsWithChildren<any>) {
  const location = useLocation() as any as ModalLocation

  const [open, fns] = useDisclosure(false, {
    onClose: () => {
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', {
          replace: true
        })
      }, 500)
    }
  })
  const navigate = useNavigate()
  useEffect(() => {
    location.state?.from && fns.open()
  }, [location.state?.from])

  const title = getTitle()

  return (
    <context.Provider value={fns['close']}>
      <NativeRoutes location={location.state?.from || location}>
        {children}
      </NativeRoutes>

      <Modal
        opened={open}
        transition="pop"
        transitionDuration={600}
        transitionTimingFunction="ease"
        onClose={fns.close}
        title={title}
      >
        <div>
          <NativeRoutes>{children}</NativeRoutes>
        </div>
      </Modal>
    </context.Provider>
  )
}
