import Page from './Profile'
import { StoryObj as st, Meta as mt } from '@storybook/react'
import { profile_data } from '../mockedData/msw'

export default {
  component: Page,
  title: 'pages/profile',
} satisfies mt<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [profile_data],
    },
  },
} satisfies st<typeof Page>
