import Page from '.'
import { frontend_decorator } from '../.storybook/storybook-decorator'
import {
  categories_data,
  empty_data,
  log_data,
  logs_data,
  logs_data_small,
} from '../mockedData/msw'

export default {
  component: Page,
  parameters: {
    page: true,
  },
  decorators: [frontend_decorator],
  title: 'pages/index',
} satisfies SB.Meta<typeof Page>

export const EmptyList = {
  parameters: {
    msw: {
      handlers: [...empty_data, log_data],
    },
  },
} satisfies SB.Story<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [logs_data_small, categories_data, log_data],
    },
  },
} satisfies SB.Story<typeof Page>

export const MultiPages = {
  parameters: {
    msw: {
      handlers: [logs_data, categories_data, log_data],
    },
  },
} satisfies SB.Story<typeof Page>
export const MultiPages2 = {
  parameters: {
    msw: {
      handlers: [logs_data, categories_data, log_data],
    },
  },
} satisfies SB.Story<typeof Page>
