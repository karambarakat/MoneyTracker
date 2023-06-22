import RoutingContainer from '@src/components/RoutingContainer'
import type { All_Errors } from 'types/src/httpErrors_default'
import {
  FallbackProps as FallbackProps_,
  useErrorBoundary,
} from 'react-error-boundary'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

type FallbackProps = {
  error:
    | Error
    | {
        // undocumented, exist in `backend` package but not built based on `types` package
        // todo: refactoring types
        name: 'TokenExpiredError'
        status: 401
        message: string
        details: { date: string }
      }
  resetErrorBoundary: FallbackProps_['resetErrorBoundary']
}

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  if (error.name === 'TokenExpiredError') {
    return <Navigate to={'/auth/login'} />
  }
  // const { resetBoundary, showBoundary } = useErrorBoundary()
  // useQueryErrorResetBoundary()
  return (
    <RoutingContainer>
      <div>Ops, some error ocurred</div>
      <button onClick={() => resetErrorBoundary()}>retry</button>
    </RoutingContainer>
  )
}
