// import { useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars, DeviceLaptop } from 'tabler-icons-react'
import { useColorMode } from './provider'
import ButtonIcon from '../components/ButtonIcon'
import { PropsOf } from '@emotion/react'

function ToggleColorScheme(Props: PropsOf<typeof ButtonIcon>) {
  const { mode, toggle, isSystem } = useColorMode()

  const dark = mode === 'dark'
  return (
    <ButtonIcon
      color={dark ? 'yellow' : 'blue'}
      onClick={toggle}
      variant="outline"
      {...Props}
      title="Toggle color scheme"
    >
      {isSystem ? (
        <DeviceLaptop />
      ) : dark ? (
        <Sun size={18} />
      ) : (
        <MoonStars size={18} />
      )}
    </ButtonIcon>
  )
}

export default ToggleColorScheme
