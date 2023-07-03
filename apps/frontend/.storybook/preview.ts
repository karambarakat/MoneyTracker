import type { Preview } from '@storybook/react'

import { initialize, mswDecorator } from 'msw-storybook-addon'

import Providers from './_app_providers'

import preview_ui from 'ui/.storybook/preview'

initialize()

const preview: Preview = {
  ...preview_ui,
  decorators: [
    mswDecorator,
    Story => {
      return Providers({ Story })
    },
    ...(preview_ui.decorators || []),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    ...preview_ui.parameters,
  },
}

export default preview
