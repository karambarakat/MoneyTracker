import 'twin.macro'
import React from 'react'
import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'
import Divider from 'ui/src/components/Divider'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import { Form } from 'ui/src/components/forms/_Form'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Suspense, useState } from 'react'
import Tooltip from 'ui/src/components/Tooltip'
import { CategoryIconFromForm } from './category_utils/CategoryIcon'
import FlexSize from 'ui/src/components/Transition/FlexSize'
// import { ColorPicker, IconPicker } from './category_utils/ColorPicker'
import CategoryThemePicker from './category_utils/CategoryThemePicker'

export default function CategoryForm(
  props: Omit<PropsOf<typeof Form>, 'required'>,
) {
  const [open, setOpen] = useState(false)

  return (
    <div
      aria-label="Add new Entry"
      tw="p-4 rounded-md dark:bg-slate-800 dark:border-slate-500 bg-slate-100 border-slate-400 border"
    >
      <Form
        required={['title', 'amount']}
        values={{ color: 'Brown', icon: '214' }}
        {...props}
      >
        <div tw="flex flex-col gap-2">
          <div tw="flex gap-2 w-full">
            <Tooltip content={<div>Change Icon</div>}>
              <div
                onClick={() => {
                  setOpen(o => !o)
                }}
              >
                <CategoryIconFromForm
                  names={{ icon: 'icon', color: 'color' }}
                />
              </div>
            </Tooltip>
            <div tw="flex-1">
              <SimpleTextField
                tw="text-2xl"
                name="title"
                title="Category Title"
              />
            </div>
          </div>
          <FlexSize no_x>
            {open && (
              <CategoryThemePicker names={{ color: 'color', icon: 'icon' }} />
            )}
          </FlexSize>
          <SimpleTextField name="note" />
          <Divider tw="-mx-4 my-4 dark:bg-slate-500 bg-slate-400" />
          <div tw="flex gap-3 justify-end">
            <Button variant="filled" size="null" tw="py-1 px-2">
              Create New Category
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
