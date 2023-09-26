import type { StorybookConfig } from '@storybook/react-vite'
import type {} from 'storybook-formik/dist/esm/register'
const config: StorybookConfig = {
  stories: [
    '../../../apps/frontend/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../designSystem/**/*.stories.@(js|jsx|ts|tsx)',
    '../designSystem/**/*.mdx',
  ],
  env: {
    VITE_BACKEND_URL: 'http://localhost:8080',
    VITE_BACKEND_API: 'http://localhost:8080/api/v1',
  },
  addons: [
    'addon-screen-reader',
    'storybook-addon-react-router-v6',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    'storybook-formik', // todo: this doesn't work
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
