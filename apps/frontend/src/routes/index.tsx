import tw from 'twin.macro'
import React from 'react'
import Dialog from 'ui/src/components/Dialog'
import { setTitle } from './_MetaContext'
import { AiFillPlusCircle } from 'react-icons/ai'
import { CreateEntryFormPortal } from '../components/EntryForm'

export default function Index_Page_Component() {
  setTitle('Home')

  return (
    <div>
      <Dialog
        content={<CreateEntryFormPortal />}
        trigger={
          <div
            aria-label="add new entry"
            tw="fixed bottom-0 right-0 mb-4 mr-8 cursor-pointer dark:bg-slate-700 bg-slate-100 rounded-full"
          >
            <AiFillPlusCircle
              size={30}
              tw="text-primary-500 transform scale-[1.4]"
            />
          </div>
        }
      />

      {/* {Array.from({ length: 20 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dicta
          velit amet quibusdam, adipisci non a maiores quam nemo provident?
        </p>
      ))} */}
      <div css={[tw`mt-4`, { '&>*': tw`mb-4` }]}></div>
    </div>
  )
}
