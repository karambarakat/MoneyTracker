import RoutingContainer from '../components/RoutingContainer'
import { FallbackProps as FallbackProps_ } from 'react-error-boundary'
import { Navigate, useLocation, useMatch } from 'react-router-dom'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'

type FallbackProps = {
  error:
    | Error
    | {
        // undocumented, exist in `backend` package but not built based on `types` package
        // todo: refactoring types
        name: 'TokenFailed'
        status: 401
        message: string
        details: { date: string }
      }
  resetErrorBoundary: FallbackProps_['resetErrorBoundary']
}

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  const { reset } = useQueryErrorResetBoundary()

  const location = useLocation()

  if (error.name === 'TokenFailed') {
    return <Navigate to={'/auth'} state={{ goBackTo: location }} />
  }
  return (
    <RoutingContainer>
      <div>Ops, some error ocurred</div>
      <button
        onClick={() => {
          resetErrorBoundary()
          reset()
        }}
      >
        retry
      </button>
    </RoutingContainer>
  )
}
