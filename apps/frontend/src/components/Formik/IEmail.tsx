import { Input } from '@mantine/core'
import { Field, FieldProps } from 'formik'
import { string } from 'yup'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  placeholder?: string
  label?: string
  description?: string
  required?: boolean
}

function MyEmailInput({
  formikName,
  required,
  placeholder,
  label,
  description
}: Props) {
  return (
    <Field
      validate={(email: any) => {
        if (email) {
          if (!string().email().isValidSync(email)) {
            return 'invalid email'
          }
        }
      }}
      name={formikName}
    >
      {({ field, meta }: FieldProps) => {
        return (
          <Input.Wrapper
            required={required}
            size="sm"
            label={label || 'Email'}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input
              size="sm"
              placeholder={placeholder || 'Enter Your email'}
              {...field}
            />
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyEmailInput
