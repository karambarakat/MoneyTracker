import CategoryIcon from '@src/components/category/CategoryIcon'
import { Button, Stack, Text } from '@mantine/core'
import dispatch from '@src/redux/dispatch'
import { LogsState, RootState } from '@src/redux/types'
import React from 'react'
import { useSelector } from 'react-redux'

import { useDisclosure } from '@mantine/hooks'
import MiddleRow from '@src/components/MiddleRow'
import AddCategory from '@src/components/AddCategory'
import Dismissible from '@src/components/Dissmasible'
import { Link } from '@src/components/ReactRoute/index'
import MyPaper from '@src/components/MyPaper'
import { setTitle } from '@src/components/ReactRoute/index'
import Amount from '@src/components/Amount'
import { Category as CatDoc } from 'types/src/schema'
import EmptyCats from '@src/components/alternates/EmptyCats'

function Categories_Page_Component() {
  setTitle('Categories')

  const [cats, { empty }] = CategoryIcon.collection.useAllCats()

  const [catId, __] = React.useState('')
  const [cIndex, c] = React.useMemo(() => {
    if (cats.length === 0) return [0, undefined]

    if (catId === '') return [0, undefined]

    const catIndex: number = cats.findIndex(cat => cat._id === catId)
    if (catIndex === -1) return [0, undefined]

    return [catIndex, cats[catIndex]]
  }, [catId])

  const [opened, handles] = useDisclosure(false, {
    onClose: () => {
      __('')
    },
  })
  const setSelected = (id: string) => {
    handles.open()
    __(id)
  }

  return empty ? (
    <EmptyCats />
  ) : (
    <MyPaper>
      <MiddleRow index={cIndex}>
        <MiddleRow.Elems>
          {[
            ...cats.map(cat => (
              <div key={cat._id} onClick={() => setSelected(cat._id)}>
                <CategoryIcon.Hoverable key={cat._id}>
                  <CategoryIcon.WithTitle title={cat.title}>
                    <CategoryIcon
                      on={catId === cat._id}
                      key={cat._id}
                      cat={cat}
                    />
                  </CategoryIcon.WithTitle>
                </CategoryIcon.Hoverable>
              </div>
            )),
            <AddCategory key={'Symbol()'} />,
          ]}
        </MiddleRow.Elems>

        <MiddleRow.Middle>
          <Dismissible opened={opened} onclose={() => handles.close()}>
            <CatDetails context={() => handles.close()} cat={c} />
          </Dismissible>
        </MiddleRow.Middle>
      </MiddleRow>
    </MyPaper>
  )
}

function CatDetails({ cat, context }: { context: () => void; cat?: CatDoc }) {
  const logs_ = useSelector<RootState, LogsState>(s => s.logs)
  const total = React.useMemo(() => {
    return logs_
      .filter(log => log.category?._id === cat?._id)
      .reduce((a, b) => a + b.amount, 0)
  }, [logs_, cat])

  return !cat ? null : (
    <Stack>
      <Stack mb={12} justify={'space-between'} sx={{ flexDirection: 'row' }}>
        <Stack
          sx={{
            flexDirection: 'row',
            // this is inside <Dismissible /> which have 30.8 px for the cancelation button
            marginTop: '-30px',
          }}
        >
          <CategoryIcon on cat={cat} />
          <Text weight={'bold'} size={24}>
            {cat.title}
          </Text>
        </Stack>
      </Stack>
      <Text>
        Total: <Amount a={total} />
      </Text>

      <Stack justify={'end'} sx={{ flexDirection: 'row' }}>
        <Button
          variant="light"
          color={'red'}
          onClick={() => {
            dispatch('category:delete', { id: cat._id })
            context()
          }}
        >
          Delete
        </Button>
        <Link to={'/editCategory/' + cat._id} as_modal>
          <Button>Edit</Button>
        </Link>
      </Stack>
    </Stack>
  )
}

export default Categories_Page_Component
