import Page from './categories'
import { StoryObj as st, Meta as mt } from '@storybook/react'
import { categories_data, category_data, empty_data } from '../mockedData/msw'

export default {
  component: Page,
  title: 'pages/categories',
} satisfies mt<typeof Page>

export const EmptyList = {
  parameters: {
    msw: {
      handlers: [...empty_data],
    },
  },
} satisfies st<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [categories_data, category_data],
    },
  },
} satisfies st<typeof Page>
