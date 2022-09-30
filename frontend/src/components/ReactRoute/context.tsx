import { createContext, useContext } from 'react'

/**
 * exit method will go back to the normal routes
 * for Modal navigation this will close the modal
 * for protected route this will go to the last page visited before entering to the auth
 */
export interface IContext {
  readonly exit: () => void
}
export const context = createContext<IContext>({
  exit: () => {},
})

export const useRoutes = () => useContext(context)
