import 'twin.macro'
import React from 'react'
import { EntryInput } from 'types/gql/graphql'
import { GraphqlMsw } from 'ui/src/storybook_utils/msw'
import { EntryBody, FormBody, FormFooter, FormRoot } from './_FormUtils'
import Button from 'ui/src/components/Button'
import { within } from '@storybook/testing-library'

function Component({ renderAs }: { renderAs: JSX.Element }) {
  return <div tw="w-[400px]">{renderAs}</div>
}

export default {
  title: 'app/EntryForm',
  parameters: {
    layout: 'centered',
    msw: [
      GraphqlMsw({
        getAllCategories: [
          {
            id: '1',
            title: 'Cat 1',
            color: 'Red',
            icon: null,
          },
          {
            id: '2',
            title: 'Cat 2',
            color: 'Orange',
            icon: '4',
          },
        ],
      }),
    ],
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
        action={async values => console.log(values)}
        values={undefined as unknown as EntryInput}
        asChild
        required={['amount', 'title']}
      >
        <div aria-label="Create New Entry">
          <FormBody
            form={<EntryBody />}
            footer={
              <FormFooter
                Rest={() => (
                  <Button
                    variant="subtle"
                    type="button"
                    color="slate"
                    size="null"
                    tw="py-1 px-2"
                  >
                    Close
                  </Button>
                )}
                Button={p => <Button {...p}>Create New Entry</Button>}
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

    const noAnimation = document.createElement('style')
    noAnimation.append('* {transition-duration: 0s !important;}')
    document.head.appendChild(noAnimation)

    const elem1 = await root.findByLabelText('Change Category')
    elem1.click()

    await new Promise(res =>
      setTimeout(() => {
        noAnimation.remove()
        res(null)
      }, 500),
    )
  },
} satisfies SB.Story<typeof Component>
