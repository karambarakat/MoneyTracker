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
            // '#ffffff',
            '#fff6e6',
            '#ffedcc',
            '#ffe4b3',
            '#ffdb99',
            '#ffd280',
            '#ffc966',
            '#ffc04d',
            '#ffb733',
            '#ffae1a',
            '#ffa500', // main
            // '#e69500',
            // '#cc8400',
            // '#b37300',
            // '#996300',
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
            '::selection': {
              backgroundColor: theme.colors['theme-orange'][4],
              color: theme.colors.gray[9],
            },
          })}
        />
        {children}
      </ColorSchemeProvider>
    </MantineProvider>
  )
}

export default MantineSetUp
