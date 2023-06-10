import { addons } from '@storybook/addons'

addons.setConfig({
  toolbar: {
    // see `./preview.ts` storybook-dark-mode configuration
    backgrounds: { hidden: true }
  }
})
