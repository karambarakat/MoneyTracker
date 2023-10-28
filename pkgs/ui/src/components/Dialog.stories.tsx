import { Plus } from 'tabler-icons-react'
import Dialog from './Dialog'
import component from './Dialog'

export default {
  title: 'Dialog',
  parameters: {
    layout: 'centered',
  },
  component,
} satisfies SB.Meta<typeof component>

export const Default = {
  render: () => {
    return (
      <Dialog
        content={<div>hi</div>}
        trigger={
          <button aria-label="open dialog">
            <Plus />
          </button>
        }
      />
    )
  },
} satisfies SB.Story<typeof component>
