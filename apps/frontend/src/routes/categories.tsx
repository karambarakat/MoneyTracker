import React from 'react'
import tw from 'twin.macro'
import { OneStateProvider } from '@src/utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import CategoryEntry from '@src/components/CategoryEntry'
import AddCategory from '@src/components/forms/AddCategory'
import { useQuery } from '@src/lib/react-query'

function Index_Page_Component() {
  setTitle('Categories')

  const { data } = useQuery('find_category', [])

  if (!data) return <div>error</div>

  return (
    <OneStateProvider>
      <div css={{ '&>*': tw`mt-4` }}>
        <AddCategory />
        {data.reverse().map(cat => (
          <CategoryEntry key={cat._id} category={cat} />
        ))}
      </div>
    </OneStateProvider>
  )
}

export default Index_Page_Component
