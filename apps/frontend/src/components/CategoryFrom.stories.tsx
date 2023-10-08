import 'twin.macro'
import React from 'react'
import { CategoryBody, FormBody, FormFooter, FormRoot } from './_FormUtils'
import Button from 'ui/src/components/Button'
import { within } from '@storybook/testing-library'

function Component({ renderAs }: { renderAs: JSX.Element }) {
  return <div tw="w-[400px]">{renderAs}</div>
}

export default {
  title: 'app/CategoryForm',
  parameters: {
    layout: 'centered',
    query: {},
    a11y: {
      rules: [
        {
          id: 'aria-hidden-focus',
          enabled: false,
        },
      ],
    },
  },
  component: Component,
} satisfies SB.Meta<typeof Component>

export const BasicForm = {
  args: {
    renderAs: (
      <FormRoot
        action={async category => console.log({ category })}
        asChild
        required={['title']}
      >
        <div aria-label="Add new Entry">
          <FormBody
            form={<CategoryBody />}
            footer={
              <FormFooter
                Button={p => <Button {...p}>Create New Category</Button>}
              />
            }
          />
        </div>
      </FormRoot>
    ),
  },
} satisfies SB.Story<typeof Component>

export const ThemeIcon = {
  args: BasicForm.args,
  play: async ({ canvasElement }) => {
    const root = within(canvasElement)
    const elem1 = await root.findByLabelText('Change Icon')
    elem1.click()
  },
} satisfies SB.Story<typeof Component>
