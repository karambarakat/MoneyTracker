import '../src/tailwind.css'
import type { Preview } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import { fakerEN } from '@faker-js/faker'
fakerEN.seed(123)

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        sm: {
          name: 'sm',
          styles: {
            width: '440px',
            height: '480px'
          }
        },
        md: {
          name: 'md',
          styles: {
            width: '668px',
            height: '824px'
          }
        },
        lg: {
          name: 'lg',
          styles: {
            width: '1024px',
            height: '668px'
          }
        }
      },

      actions: { argTypesRegex: '^on[A-Z].*' },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/
        }
      }
    }
  },

  decorators: [
    (Story, context) => {
      const mode = useDarkMode() ? 'dark' : 'light'
      return <ColorModeProvider mode={mode}>{Story()} </ColorModeProvider>
    }
  ]
}

export default preview
