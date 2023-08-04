import Page from './Profile'
import { profile_data } from '../mockedData/msw'

export default {
  component: Page,
  parameters: {
    page: true,
  },
  title: 'pages/profile',
} satisfies SB.Meta<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [profile_data],
    },
  },
} satisfies SB.Story<typeof Page>
