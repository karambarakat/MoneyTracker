// import { useMantineColorScheme } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { Sun, MoonStars } from 'tabler-icons-react'
import { useColorMode } from './provider'

function ActionIcon({ children }: PropsWithChildren<any>) {
  return <>{children}</>
}

function ToggleColorScheme() {
  const [mode, setMode] = useColorMode()
  const dark = mode === 'dark'
  return (
    <ActionIcon
      variant="outline"
      size={'lg'}
      color={dark ? 'yellow' : 'blue'}
      onClick={() => setMode(s => (s === 'dark' ? 'light' : 'dark'))}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  )
}

export default ToggleColorScheme
