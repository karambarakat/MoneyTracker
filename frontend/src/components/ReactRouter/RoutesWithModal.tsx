import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Outlet, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Modal as MModal } from '@mantine/core'

type T = [boolean, (a: boolean) => void]
const initial: T = [false, () => {}]
const context = createContext<T>(initial)

function MyRoutes({ children }: PropsWithChildren<any>) {
  const location = useLocation()
  const nav = useNavigate()

  const [oldL, setOldL] = useState(location)

  const [mode, setMode] = useState<T[0]>(initial[0])
  useEffect(() => {
    !mode && setOldL(location)
  }, [mode])

  const isBackground = oldL.key !== location.key

  return (
    <>
      <context.Provider value={[isBackground, setMode]}>
        {mode && (
          <Modal opened={isBackground}>
            <Routes>{children}</Routes>
          </Modal>
        )}
      </context.Provider>
      <context.Provider value={[true, setMode]}>
        <Normal>
          <Routes location={mode ? oldL : location}>{children}</Routes>
        </Normal>
      </context.Provider>
    </>
  )
}
// enter the modal
/**
  {true && <Routes>{children}</Routes>}
  <Routes location={'/theLastLocation'}>{children}</Routes>
 */
// out of modal
/**
  {false && <Routes>{children}</Routes>}
  <Routes location={'theCurrentLocation'}>{children}</Routes>
 */
// no history (out or in modal)

MyRoutes.Modal = function () {
  const [isBackground, setMode] = useContext(context)
  useEffect(() => {
    setMode(true)
    return () => setMode(false)
  }, [])

  return isBackground ? <Outlet /> : <></>
}

function Modal({ children, opened }: PropsWithChildren<{ opened: boolean }>) {
  return (
    <div
    // style={{ position: 'absolute', zIndex: 2 }}
    >
      {opened && 'with modal'}
      {children}
    </div>
  )
}
function Normal({ children }: PropsWithChildren<any>) {
  return (
    <div
    // style={{ position: 'relative', zIndex: 1 }}
    >
      {children}
    </div>
  )
}

export default MyRoutes
