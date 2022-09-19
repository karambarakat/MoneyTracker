import CategoryIcon from '@components/category/CategoryIcon'
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import category_find from '@redux/api/category_find'
import {
  CategoriesState,
  CategoryDoc,
  LogsState,
  RootState,
} from '@redux/types'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Category, Plus, X } from 'tabler-icons-react'
import { useDisclosure, useHover } from '@mantine/hooks'
import MiddleRow from '@components/MiddleRow'
import AddCategory from '@components/AddCategory'
import Dismissible from '@components/Dissmasible'
import { Link } from '@components/ReactRouter'
import category_delete from '@redux/api/category_delete'

function Categories_Page_Component() {
  const cats = CategoryIcon.collection.useAllCats()

  const [catId, __] = React.useState('')
  const [cIndex, c] = React.useMemo(() => {
    if (cats.length === 0) return [0, undefined]

    if (catId === '') return [0, undefined]

    var catIndex: number = cats.findIndex((cat) => cat._id === catId)
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

  return (
    <Paper shadow={'xs'} p={32}>
      <MiddleRow index={cIndex}>
        <MiddleRow.Elems>
          {[
            ...cats.map((cat) => (
              <div onClick={() => setSelected(cat._id)}>
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
    </Paper>
  )
}

function CatDetails({
  cat,
  context,
}: {
  context: () => void
  cat?: CategoryDoc
}) {
  const logs_ = useSelector<RootState, LogsState>((s) => s.logs)
  const total = React.useMemo(() => {
    return logs_
      .filter((log) => log.category?._id === cat?._id)
      .reduce((a, b) => a + b.amount, 0)
  }, [logs_, cat])

  return !cat ? null : (
    <Stack sx={(th) => ({ backgroundColor: th.colors?.gray[0] || 'gray' })}>
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
      <Text>total: {total}</Text>

      <Stack justify={'end'} sx={{ flexDirection: 'row' }}>
        <Button
          variant="light"
          color={'red'}
          onClick={() => {
            category_delete(cat._id)
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
