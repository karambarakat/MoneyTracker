// import { useMantineColorScheme } from '@mantine/core'
import { Sun, MoonStars, DeviceLaptop } from 'tabler-icons-react'
import { useColorMode } from './provider'
import ButtonIcon from '../components/ButtonIcon'
import { PropsOf } from '@emotion/react'
import tw from 'twin.macro'

// function ToggleColorScheme(Props: Omit<PropsOf<typeof ButtonIcon>, 'label'>) {
//   const { mode, toggle, isSystem } = useColorMode()

//   const dark = mode === 'dark'
//   return (
//     <ButtonIcon
//       {...Props}
//       color={dark ? 'yellow' : 'blue'}
//       variant="outline"
//       label="Toggle color scheme"
//       asChild
//     >
//       <button onClick={toggle}>
//         {isSystem ? (
//           <DeviceLaptop />
//         ) : dark ? (
//           <Sun size={18} />
//         ) : (
//           <MoonStars size={18} />
//         )}
//       </button>
//     </ButtonIcon>
//   )
// }

function ToggleColorScheme(props: PropsOf<typeof ButtonIcon>) {
  const { mode, toggle, isSystem } = useColorMode()
  const dark = mode === 'dark'
  return (
    <ButtonIcon
      {...props}
      color={dark ? 'yellow' : 'blue'}
      variant="subtle"
      label="Toggle color scheme"
      asChild
    >
      <button onClick={toggle}>
        {isSystem ? (
          <DeviceLaptop />
        ) : dark ? (
          <Sun size={18} />
        ) : (
          <MoonStars size={18} />
        )}
      </button>
    </ButtonIcon>
  )
}
export default ToggleColorScheme
