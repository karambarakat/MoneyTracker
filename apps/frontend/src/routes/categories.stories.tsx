import Page from './categories'
import { categories_data, category_data, empty_data } from '../mockedData/msw'

export default {
  component: Page,
  parameters: {
    page: {},
  },
  title: 'pages/categories',
} satisfies SB.Meta<typeof Page>

export const EmptyList = {
  parameters: {
    msw: {
      handlers: [...empty_data],
    },
  },
} satisfies SB.Story<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [categories_data, category_data],
    },
  },
} satisfies SB.Story<typeof Page>
