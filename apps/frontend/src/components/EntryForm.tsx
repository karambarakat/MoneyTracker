import 'twin.macro'
import { EntryInput, Mutation } from 'types/gql/graphql'
import { EntryBody, FormBody, FormFooter, FormRoot } from './_FormUtils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create_entry } from '../api/mutations'
import Button from 'ui/src/components/Button'
import Dialog from 'ui/src/components/Dialog'
import { Dispatch, SetStateAction } from 'react'
import { FormInterface } from 'ui/src/components/forms/_Form'

type Input = EntryInput

export function CreateEntryFormPortal({
  setState,
}: {
  setState: Dispatch<SetStateAction<boolean>>
}) {
  const client = useQueryClient()
  const create = useMutation({
    mutationFn: create_entry,
    onSettled: () => {
      create_entry.shouldInvalidate(client, null) // all pages
      setState(false)
    },
  })

  return (
    <div tw="z-50 fixed inset-0 m-auto h-fit shadow-2xl w-[550px] max-w-[80vw]">
      <div tw="bg-gray-950/20">
        <FormRoot
          action={async entry => create.mutateAsync({ entry })}
          values={undefined as unknown as Input}
          asChild
          then={(ctx, vals) => {
            ctx.setStatus({ success: `"${vals.title}" was created` })
          }}
          required={['amount', 'title']}
        >
          <div aria-label="Create New Entry">
            <FormBody
              form={<EntryBody />}
              footer={
                <FormFooter
                  Rest={() => (
                    <Dialog.Close asChild>
                      <Button
                        type="button"
                        variant="subtle"
                        color="slate"
                        size="null"
                        tw="py-1 px-2"
                      >
                        Close
                      </Button>
                    </Dialog.Close>
                  )}
                  Button={p => <Button {...p}>Create New Entry</Button>}
                />
              }
            />
          </div>
        </FormRoot>
      </div>
    </div>
  )
}

export function UpdateEntryFormActionPortal({
  action,
  initialValues,
}: {
  initialValues: Input
  action: FormInterface<
    { entry: EntryInput },
    Mutation['updateOneEntry']
  >['action']
}) {
  return (
    <Dialog.Floating>
      <FormRoot
        action={async entry => action({ entry })}
        values={initialValues}
        then={(ctx, vals) => {
          vals === true && ctx.setStatus({ success: 'updated successfully' })
        }}
        asChild
        required={['title']}
      >
        <div aria-label="Update Category">
          <FormBody
            form={<EntryBody />}
            footer={
              <FormFooter
                Button={props => <Button {...props}>Update</Button>}
              />
            }
          />
        </div>
      </FormRoot>
    </Dialog.Floating>
  )
}
