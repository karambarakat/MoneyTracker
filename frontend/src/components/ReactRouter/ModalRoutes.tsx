import { PropsWithChildren } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'

function RouteModal() {
  return (
    <div>
      hi
      <Outlet />
    </div>
  )
}

function ModalRoutes({ children }: PropsWithChildren<any>) {
  return <Route element={RouteModal}>{children}</Route>
}

ModalRoutes.Normal = ({ children }: PropsWithChildren<any>) => children

ModalRoutes.With = ({ children }: PropsWithChildren<any>) => {
  return children
}

ModalRoutes.Only = ({ children }: PropsWithChildren<any>) => {
  return children
}

export default ModalRoutes
