import { useListState, useTimeout } from '@mantine/hooks'
import { fakerEN } from '@faker-js/faker'
import React from 'react'

const name = () => fakerEN.person.firstName()

export const finalList = [name(), name(), name(), name(), name(), name()]

export default function useListForTesting() {
  fakerEN.seed(234)
  const [list, op] = useListState(finalList.slice(0, 3))

  useTimeout(() => op.append(finalList[3]), 500, { autoInvoke: true })

  useTimeout(() => op.shift(), 1500, { autoInvoke: true })

  useTimeout(() => op.append(...finalList.slice(4)), 2500, { autoInvoke: true })

  return list
}
