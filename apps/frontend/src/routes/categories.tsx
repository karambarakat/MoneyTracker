import React from 'react'
import tw from 'twin.macro'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import CategoryEntry from '../components/CategoryEntry'
import AddCategory from '../components/forms/AddCategory'
import { useQuery } from '../lib/react-query'

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
