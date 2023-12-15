import React from 'react'
import 'twin.macro'

import SecretField from './SecretField'

export default {
  title: 'forms/SecretField',
  parameters: {
    form: {
      asField: {},
    },
  },
  args: {
    autoComplete: 'new-password',
  },
  component: SecretField,
} satisfies SB.Meta<typeof SecretField>

export const Default = {} satisfies SB.Story<typeof SecretField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof SecretField>

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
} satisfies SB.Story<typeof SecretField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        value: 'filled with error',
        failed: true,
      },
    },
  },
} satisfies SB.Story<typeof SecretField>
