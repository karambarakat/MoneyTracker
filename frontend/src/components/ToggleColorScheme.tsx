import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'

function ToggleColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  // @ts-ignore
  const dark = colorScheme === 'i'
  return (
    <ActionIcon
      variant="outline"
      size={'lg'}
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  )
}

export default ToggleColorScheme
