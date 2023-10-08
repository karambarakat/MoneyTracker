import React from 'react'
import 'twin.macro'
import { useState } from 'react'
import { Slot } from '@radix-ui/react-slot'
import Divider from 'ui/src/components/Divider'
import { Form, FormInterface } from 'ui/src/components/forms/_Form'
import { WithAsChild, WithChildren } from 'ui/src/utils/WithChildren'
import Button from 'ui/src/components/Button'
import Status from 'ui/src/components/forms/Status'
import Tooltip from 'ui/src/components/Tooltip'
import {
  CategoryIconFromForm,
  CategoryIconFromFormId,
} from './category_utils/CategoryIcon'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import FlexSize from 'ui/src/components/Transition/FlexSize'
import CategoryThemePicker from './category_utils/CategoryThemePicker'
import CategoryPicker from './category_utils/CategoryPicker'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'

export function CategoryBody() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div tw="flex gap-2 w-full">
        <Tooltip content="Change Icon">
          <div
            aria-label="Change Icon"
            tw="cursor-pointer"
            onClick={() => {
              setOpen(o => !o)
            }}
          >
            <CategoryIconFromForm names={{ icon: 'icon', color: 'color' }} />
          </div>
        </Tooltip>
        <div tw="flex-1">
          <SimpleTextField tw="text-2xl" name="title" title="Category Title" />
        </div>
      </div>
      <FlexSize no_x>
        {open && (
          <CategoryThemePicker names={{ color: 'color', icon: 'icon' }} />
        )}
      </FlexSize>
    </div>
  )
}

export function EntryBody() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div tw="flex gap-2 w-full">
        <Tooltip content="Change Category">
          <div
            tw="cursor-pointer"
            onClick={() => {
              setOpen(o => !o)
            }}
          >
            <CategoryIconFromFormId tw="cursor-pointer" name={'category'} />
          </div>
        </Tooltip>
        <div tw="flex-1">
          <SimpleTextField tw="text-2xl" name="title" title="Entry Title" />
        </div>
      </div>
      <FlexSize no_x>
        {open && <CategoryPicker name="category" tw="mt-2" />}
      </FlexSize>
      <SimpleNumberField name="amount" />
      <SimpleTextField name="note" />
    </div>
  )
}

export function FormFloating(props: WithChildren) {
  return (
    <div tw="z-50 fixed inset-0 m-auto h-fit shadow-2xl w-[550px] max-w-[80vw]">
      {props.children}
    </div>
  )
}

export function FormRoot<Input extends object, Return = unknown>({
  asChild,
  children,
  ...props
}: WithAsChild & FormInterface<Input, Return>) {
  const Component = asChild ? Slot : 'div'
  return (
    <Form {...props}>
      <Component tw="rounded-md dark:bg-slate-800 dark:border-slate-500 bg-slate-100 border-slate-400 border">
        {children}
      </Component>
    </Form>
  )
}

export function FormBody(props: { form: JSX.Element; footer: JSX.Element }) {
  return (
    <div tw="p-4 flex flex-col">
      {props.form}
      <Divider tw="-mx-4 my-4 dark:bg-slate-500 bg-slate-400" />
      {props.footer}
    </div>
  )
}

export function FormFooter(props: { Button?: typeof Button; Rest?: React.FC }) {
  const Button_ = props.Button || (props => <Button {...props}>Submit</Button>)
  const Rest_ = props.Rest || Slot

  return (
    <div tw="flex gap-3 justify-between">
      <span tw="flex-1">
        <Status />
      </span>

      <Rest_ />

      <Button asChild type="submit" variant="filled" size="null" tw="py-1 px-2">
        <Button_ variant="filled" size="null" />
      </Button>
    </div>
  )
}
