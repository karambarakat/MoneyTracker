import 'twin.macro'
import CategoryForm from './CategoryForm'

import { Root, Portal, Content } from '@radix-ui/react-dialog'

export default {
  title: 'app/CategoryForm',
  parameters: {
    layout: 'centered',
    a11y: {
      rules: [
        {
          id: 'aria-hidden-focus',
          enabled: false,
        },
      ],
    },
  },
  args: {
    action: async values => console.log(values),
  },
  component: CategoryForm,
  render: props => (
    <Root open>
      <Portal>
        <div tw="fixed inset-0 z-50 bg-gray-950/20" />
        <Content asChild>
          <div tw="z-50 fixed inset-0 h-screen grid place-content-center">
            <div tw="w-[400px]">
              <CategoryForm {...props} />
            </div>
          </div>
        </Content>
      </Portal>
    </Root>
  ),
} satisfies SB.Meta<typeof CategoryForm>

export const Dark = {} satisfies SB.Story<typeof CategoryForm>
export const Light = {} satisfies SB.Story<typeof CategoryForm>
