import { ActionIcon, Button } from '@mantine/core'
import { Plus } from 'tabler-icons-react'
import { Link } from './ReactRoute'

function AddLogButton() {
  return (
    <Link to="/addLog" as_modal>
      <div
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: '100'
        }}
      >
        <ActionIcon variant="filled" color={'orange'} radius={'xl'} size="xl">
          <Plus />
        </ActionIcon>
      </div>
    </Link>
  )
}

export default AddLogButton
