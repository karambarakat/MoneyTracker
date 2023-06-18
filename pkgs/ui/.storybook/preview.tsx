import '../src/tailwind.css'
import type { Preview } from '@storybook/react'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import GlobalStyles from '../src/GlobalStyles'
import { fakerEN } from '@faker-js/faker'

import 'twin.macro'
import { Global } from '@emotion/react'
import { colors } from '../src/utils/tw'
fakerEN.seed(123)

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: {
        xs: {
          // 16:9 portrait
          name: 'xs',
          styles: {
            width: '440px',
            height: '824px',
          },
        },
        sm: {
          // 16:9 portrait, sm breakpoint
          name: 'sm',
          styles: {
            width: '640px',
            height: '1140px',
          },
        },
        md: {
          // 16:9 landscape, md breakpoint
          name: 'md',
          styles: {
            width: '768px',
            height: '432px',
          },
        },
        lg: {
          // 16:9 landscape, lg breakpoint
          name: 'lg',
          styles: {
            width: '1024px',
            height: '576px',
          },
        },
      },

      actions: { argTypesRegex: '^on[A-Z].*' },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
      },
    },
    darkMode: {
      current: 'dark',
      darkClass: ['dark', 'dark-mode-plugin-dark'],
      lightClass: ['light', 'dark-mode-plugin-light'],
      classTarget: 'html',
      stylePreview: true,
    },
  },

  decorators: [
    Story => {
      const sbMode = useDarkMode() ? 'dark' : 'light'

      return <ColorModeProvider mode={sbMode}>{Story()}</ColorModeProvider>
    },
    Story => {
      return (
        <>
          <GlobalStyles />
          <Global
            styles={{
              '.docs-story': { background: colors.slate[50] },
              '.dark .docs-story': {
                background: colors.slate[700],
                color: colors.white,
              },
            }}
          />
          <Story />
        </>
      )
    },
  ],
}

export default preview
