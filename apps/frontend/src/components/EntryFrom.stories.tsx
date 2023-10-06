import 'twin.macro'
import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { EntryInput, Query } from 'types/gql/graphql'
import { rejectGraphql } from 'ui/src/storybook_utils/msw'
import { EntryBody, FormBody, FormFooter, FormRoot } from './_FormUtils'
import Button from 'ui/src/components/Button'

function Component({ renderAs }: { renderAs: JSX.Element }) {
  return <div tw="w-[400px]">{renderAs}</div>
}

export default {
  title: 'app/EntryForm',
  parameters: {
    layout: 'centered',
    msw: [rejectGraphql],
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
  decorators: [
    Story => {
      const client = useQueryClient()

      client.setQueryData(['find_category'], [
        {
          id: 'sdf',
          createdAt: 'sdf',
          createdBy: {
            id: 'sdf',
            email: 'sdf',
            createdAt: 'sdf',
            providers: 'sdf',
            updatedAt: 'sd',
          },
          title: 'sdf',
          updatedAt: 'sdlfk',
        },
      ] satisfies Query['getAllCategories'])
      return <Story />
    },
  ],
} satisfies SB.Meta<typeof Component>

export const CreateEntry = {
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

export const UpdateEntry = {
  args: {
    renderAs: (
      <FormRoot
        action={async values => console.log(values)}
        values={undefined as unknown as EntryInput}
        asChild
        required={['amount', 'title']}
      >
        <div aria-label="Update Entry">
          <FormBody
            form={<EntryBody />}
            footer={
              <FormFooter
                Rest={() => (
                  <Button
                    variant="subtle"
                    color="slate"
                    size="null"
                    tw="py-1 px-2"
                  >
                    Close
                  </Button>
                )}
                Button={p => <Button {...p}>Update</Button>}
              />
            }
          />
        </div>
      </FormRoot>
    ),
  },
} satisfies SB.Story<typeof Component>
