// import { useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars } from 'tabler-icons-react'
import { useColorMode } from './provider'
import ButtonIcon from '../components/ButtonIcon'
import { PropsOf } from '@emotion/react'

function ToggleColorScheme(Props: PropsOf<typeof ButtonIcon>) {
  const [mode, setMode] = useColorMode()
  const dark = mode === 'dark'
  return (
    <ButtonIcon
      color={dark ? 'yellow' : 'blue'}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      variant="outline"
      {...Props}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={18} /> : <MoonStars size={18} />}
    </ButtonIcon>
  )
}

export default ToggleColorScheme
