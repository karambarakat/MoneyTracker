import React from 'react'
import tw from 'twin.macro'
import { OneStateProvider } from '@src/utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import { useCategories } from '@src/api/category_queries'
import CategoryEntry from '@src/component/CategoryEntry'
import AddCategory from '@src/component/forms/AddCategory'

function Index_Page_Component() {
  setTitle('categories')

  const { data } = useCategories()

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
