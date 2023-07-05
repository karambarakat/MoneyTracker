import { Alert } from '@mantine/core'
import { useFormikContext } from 'formik'

function AlertStatus() {
  const { status, setStatus } = useFormikContext()
  if (status?.error) {
    return (
      <Alert
        withCloseButton
        onClose={() => setStatus({ error: null })}
        color="red"
        title="error"
      >
        {status.error}
      </Alert>
    )
  } else {
    return null
  }
}

export default AlertStatus
