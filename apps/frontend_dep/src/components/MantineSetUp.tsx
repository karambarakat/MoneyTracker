import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { PropsWithChildren, useState } from 'react'

type Props = PropsWithChildren<any>
function MantineSetUp({ children }: Props) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        theme={{
          colorScheme: colorScheme,
          primaryColor: 'theme-orange',
          colors: {
            'theme-orange': [
              // '#ffffff',
              '#fdf5e7', //'#fff6e6',
              '#fcecce', //'#ffedcc',
              '#fbe2b6', //'#ffe4b3',
              '#fad99d', //'#ffdb99',
              '#f9d085', //'#ffd280',
              '#f7c66d', //'#ffc966',
              '#f6bd55', //'#ffc04d',
              '#f5b43c', //'#ffb733',
              '#f4aa24', //'#ffae1a',
              '#f2a10c', //'#ffa500', // main
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
            styles={theme => ({
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
    </ColorSchemeProvider>
  )
}

export default MantineSetUp
