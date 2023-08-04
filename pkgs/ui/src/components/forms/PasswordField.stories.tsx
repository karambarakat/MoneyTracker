import React from 'react'
import 'twin.macro'

import PasswordField from './PasswordField'

export default {
  title: 'forms/PasswordField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: PasswordField,
} satisfies SB.Meta<typeof PasswordField>

export const Default = {} satisfies SB.Story<typeof PasswordField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof PasswordField>

export const Long = {
  parameters: {
    form: {
      asField: {
        value:
          'field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, ',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof PasswordField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        value: 'filled with error',
        failed: true,
      },
    },
  },
} satisfies SB.Story<typeof PasswordField>
