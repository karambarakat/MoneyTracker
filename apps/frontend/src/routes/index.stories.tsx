import Page from '.'
import { StoryObj as st, Meta as mt } from '@storybook/react'
import {
  categories_data,
  empty_data,
  log_data,
  logs_data,
  logs_data_small,
} from '@src/mockedData/msw'

export default {
  component: Page,
  title: 'pages/index',
} satisfies mt<typeof Page>

export const EmptyList = {
  parameters: {
    msw: {
      handlers: [...empty_data, log_data],
    },
  },
} satisfies st<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [logs_data_small, categories_data, log_data],
    },
  },
} satisfies st<typeof Page>

export const MultiPages = {
  parameters: {
    msw: {
      handlers: [logs_data, categories_data, log_data],
    },
  },
} satisfies st<typeof Page>
