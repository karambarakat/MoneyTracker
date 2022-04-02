import { Button, ButtonProps } from '@mantine/core'
import { useFormikContext } from 'formik'

function SubmitButton(props: ButtonProps<'button'>) {
  const { isSubmitting } = useFormikContext()
  return <Button {...props} loading={isSubmitting} type='submit' size='lg' />
}

export default SubmitButton
