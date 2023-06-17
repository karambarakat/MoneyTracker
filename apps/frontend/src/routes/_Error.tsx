import RoutingContainer from '@src/components/RoutingContainer'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { FallbackProps, useErrorBoundary } from 'react-error-boundary'

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  // const { resetBoundary, showBoundary } = useErrorBoundary()
  // useQueryErrorResetBoundary()
  return <RoutingContainer>Ops, some error ocurred</RoutingContainer>
}
