/// <reference path="../types/SB.d.ts"/>
import '../src/tailwind.css'
import type { Preview } from '@storybook/react'
import React, { useEffect, useMemo } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import GlobalStyles from '../src/GlobalStyles'
import { fakerEN } from '@faker-js/faker'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { Form } from '../src/components/forms/_Form'
import { action } from '@storybook/addon-actions'

import 'twin.macro'
import { Global, PropsOf } from '@emotion/react'
import { colors } from '../src/utils/tw'
import { useField, useFormik, useFormikContext } from 'formik'
import { DarkModeDecorator, FormDecorator, TwDecoration } from './_decorator'
import type { DarkModeStore } from 'storybook-dark-mode'

fakerEN.seed(123)

initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
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
      darkClass: ['dark', 'dark-mode-plugin-dark'],
      lightClass: ['light', 'dark-mode-plugin-light'],
      classTarget: 'html',
      stylePreview: true,
    } satisfies Partial<DarkModeStore>,
  },

  decorators: [mswDecorator, DarkModeDecorator, FormDecorator, TwDecoration],
}

export default preview
