import isChromatic from 'chromatic/isChromatic'
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
    // One of your manager-entries failed: http://localhost:6006/sb-addons/addon-screen-reader-12/register-bundle.js ReferenceError: regeneratorRuntime is not defined
    // 'addon-screen-reader', // does not work, cause problems in chromatic
    'storybook-addon-react-router-v6',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {},
    },
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
