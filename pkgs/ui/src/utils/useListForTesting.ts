import { useListState, useTimeout } from '@mantine/hooks'
import { fakerEN } from '@faker-js/faker'

const name = () => fakerEN.person.firstName()

export default function useListForTesting() {
  fakerEN.seed(234)
  const [list, op] = useListState([name(), name(), name()])

  useTimeout(
    () => {
      op.append(name())
    },
    500,
    { autoInvoke: true },
  )

  useTimeout(
    () => {
      op.shift()
    },
    1500,
    { autoInvoke: true },
  )

  useTimeout(
    () => {
      op.append(name(), name())
    },
    2500,
    { autoInvoke: true },
  )

  return list
}
