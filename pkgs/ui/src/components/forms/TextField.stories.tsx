import { Meta, StoryObj } from '@storybook/react'
import TextField from './TextField'
import Form from './Form'
import { action } from '@storybook/addon-actions'

export default {
  title: 'forms/TextField',
  component: TextField,
  args: {
    name: 'name',
  },
  decorators: [
    Story => (
      <Form values={[]} action={async vals => action('submit-form')}>
        <Story />
      </Form>
    ),
  ],
} satisfies Meta<typeof TextField>

export const Default = {} satisfies StoryObj<typeof TextField>
