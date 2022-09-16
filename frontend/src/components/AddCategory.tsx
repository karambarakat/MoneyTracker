import { Box, Text, ThemeIcon } from '@mantine/core'
import { Plus } from 'tabler-icons-react'
import { Link } from './ReactRouter'

function AddCategory() {
  return (
    <Link to="/addCategory" as_modal>
      <Box
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
        <ThemeIcon
          radius={'xl'}
          p="xs"
          size={48}
          color={'gray'}
          variant={'outline'}
        >
          <Plus />
        </ThemeIcon>

        <Text color={'gray'} style={{ textAlign: 'center' }}>
          New Category
        </Text>
      </Box>
    </Link>
  )
}
export default AddCategory
