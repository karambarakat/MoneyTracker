import 'twin.macro'
import AddEntry from './AddEntry'

import { Root, Portal, Content } from '@radix-ui/react-dialog'

export default {
  title: 'app/AddEntry',
  parameters: {
    layout: 'centered',
  },
  args: {
    action: async values => console.log(values),
  },
  component: AddEntry,
  render: props => (
    <Root open>
      <Portal>
        <div tw="fixed inset-0 z-50 bg-gray-950/20" />
        <Content asChild>
          <div tw="z-50 fixed inset-0 h-screen grid place-content-center">
            <AddEntry {...props} />
          </div>
        </Content>
      </Portal>
    </Root>
  ),
} satisfies SB.Meta<typeof AddEntry>

export const Dark = {} satisfies SB.Story<typeof AddEntry>
export const Light = {} satisfies SB.Story<typeof AddEntry>
