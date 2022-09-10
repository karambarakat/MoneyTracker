import CategoryIcon from '@components/CategoryIcon'
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from '@mantine/core'
import category_find from '@redux/api/category_find'
import { CategoriesState, LogsState, RootState } from '@redux/types'
import React from 'react'
import { useSelector } from 'react-redux'
import { Plus } from 'tabler-icons-react'
import { useHover } from '@mantine/hooks'
import MiddleRow from '@components/MiddleRow'
import AddCategory from '@components/AddCategory'

function Categories_Page_Component() {
  const cats = useSelector<RootState, CategoriesState>((s) => s.categories)
  React.useEffect(() => {
    category_find()
  }, [])

  return (
    <Paper shadow={'xs'} p={32}>
      <MiddleRow index={12}>
        <MiddleRow.Elems>
          {[...cats.map((cat) => <CatBox cat={cat} />), <AddCategory />]}
        </MiddleRow.Elems>

        <MiddleRow.Middle>
          <div style={{}}>hello</div>
        </MiddleRow.Middle>
      </MiddleRow>
    </Paper>
  )
}

function CatBox({
  cat,
}: {
  cat: { title?: string; color?: string; icon?: string }
}) {
  const { hovered, ref } = useHover()

  return (
    <Box
      ref={ref}
      sx={{
        ':hover': {
          cursor: 'pointer',
        },
        ':active': {
          transform: 'translateY(1px)',
        },
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <CategoryIcon on={false} hover={hovered} cat={cat} />
      <Text style={{ wordBreak: 'break-word', textAlign: 'center' }}>
        {cat.title}
      </Text>
    </Box>
  )
}

export default Categories_Page_Component
