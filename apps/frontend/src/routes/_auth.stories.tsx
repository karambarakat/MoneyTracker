import { categories_data, category_data, empty_data } from '../mockedData/msw'
import { frontend_decorator } from '../.storybook/storybook-decorator'
import * as Auth from './_Auth'
import { withRouter } from 'storybook-addon-react-router-v6'

const Page = Auth.Authentication

export default {
  component: Page,
  parameters: {
    page: {},
  },
  decorators: [frontend_decorator, withRouter],
  title: 'pages/auth',
} satisfies SB.Meta<typeof Page>

export const Login = {
  parameters: {
    reactRouter: {
      routing: {
        path: '/auth',
      },
    },
  },
} satisfies SB.Story<typeof Page>

export const LoginDark = {
  parameters: {
    ...Login.parameters,
    mode: 'dark',
  },
} satisfies SB.Story<typeof Page>

export const Register = {
  parameters: {
    reactRouter: {
      routing: {
        path: '/auth/register',
      },
    },
    mode: 'light',
  },
} satisfies SB.Story<typeof Page>

export const RegisterDark = {
  parameters: {
    ...Register.parameters,
    mode: 'dark',
  },
} satisfies SB.Story<typeof Page>
