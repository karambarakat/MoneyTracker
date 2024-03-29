import { Plus } from 'tabler-icons-react'
import component from './Tooltip'
import 'twin.macro'
import { within } from '@storybook/testing-library'

export default {
  title: 'Tooltip',
  parameters: {
    layout: 'centered',
  },
  args: {
    content: 'hover me',
    children: <Plus />,
  },
  component,
} as SB.Meta<typeof component>

export const Base = {} as SB.Story<typeof component>

export const Hovered = {
  play: async ({ canvasElement }) => {
    const elem = within(canvasElement).getByRole('tooltip')
    elem.focus()
  },
} as SB.Story<typeof component>
