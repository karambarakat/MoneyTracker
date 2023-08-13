import Page from './Profile'
import { profile_data } from '../mockedData/msw'
import { frontend_decorator } from '../.storybook/storybook-decorator'

export default {
  component: Page,
  parameters: {
    page: true,
  },
  decorators: [frontend_decorator],
  title: 'pages/profile',
} satisfies SB.Meta<typeof Page>

export const Default = {
  parameters: {
    msw: {
      handlers: [profile_data],
    },
  },
} satisfies SB.Story<typeof Page>
