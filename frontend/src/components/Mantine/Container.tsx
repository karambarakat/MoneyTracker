import { Container as DefaultContainer } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { PropsWithChildren } from 'react'

export default function Container_C({ children }: PropsWithChildren<any>) {
  const matches = useMediaQuery('(max-width: 1500px)')
  return (
    <DefaultContainer size={matches ? 'sm' : 'md'}>{children}</DefaultContainer>
  )
}
