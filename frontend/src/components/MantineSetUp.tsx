import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<any> {}
function MantineSetUp({ children }: Props) {
  const [colorScheme, toggleColorScheme] = useToggle<ColorScheme>('light', [
    'light',
    'dark',
  ])
  return (
    <MantineProvider
      withGlobalStyles
      theme={{
        colorScheme: colorScheme,
        primaryColor: 'theme-orange',
        colors: {
          'theme-orange': [
            '#ffedcc',
            '#ffe4b3',
            '#ffdb99',
            '#ffd280', //996300
            '#ffc966', //b37300
            '#ffc04d', //cc8400
            '#ffb733', //e69500
            '#ffae1a', //ffa500
            '#ffa500', //ffae1a
            '#e69500', //ffb733
            // '#cc8400', //ffc04d
            // '#b37300', //ffc966
            // '#996300', //ffd280
          ],
        },
      }}
    >
      <ColorSchemeProvider
        toggleColorScheme={toggleColorScheme}
        colorScheme={colorScheme}
      >
        <Global
          styles={(theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              margin: 0,
              padding: 0,
            },
            a: {
              textDecoration: 'none',
              color: 'inherit',
            },
          })}
        />
        {children}
      </ColorSchemeProvider>
    </MantineProvider>
  )
}

export default MantineSetUp
