import 'twin.macro'
import EntryForm from './EntryForm'

import { Root, Portal, Content } from '@radix-ui/react-dialog'

export default {
  title: 'app/EntryForm',
  parameters: {
    layout: 'centered',
  },
  args: {
    action: async values => console.log(values),
  },
  component: EntryForm,
  render: props => (
    <Root open>
      <Portal>
        <div tw="fixed inset-0 z-50 bg-gray-950/20" />
        <Content asChild>
          <div tw="z-50 fixed inset-0 h-screen grid place-content-center">
            <EntryForm {...props} />
          </div>
        </Content>
      </Portal>
    </Root>
  ),
} satisfies SB.Meta<typeof EntryForm>

export const Dark = {} satisfies SB.Story<typeof EntryForm>
export const Light = {} satisfies SB.Story<typeof EntryForm>
