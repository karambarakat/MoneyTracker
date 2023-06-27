import RoutingContainer from '@src/components/RoutingContainer'
import type { All_Errors } from 'types/dist/helpers/HttpError'
import { FallbackProps as FallbackProps_ } from 'react-error-boundary'
import { Navigate } from 'react-router-dom'
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
  if (error.name === 'TokenFailed') {
    return <Navigate to={'/auth/login'} />
  }
  const { reset } = useQueryErrorResetBoundary()

  // useQueryErrorResetBoundary()
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
