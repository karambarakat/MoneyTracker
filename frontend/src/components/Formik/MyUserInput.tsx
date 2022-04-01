import { Input, InputWrapper } from '@mantine/core'
import { Field, FieldProps } from 'formik'

interface Props {
  formikName: string
  placeholder?: string
  label?: string
  description?: string
  required?: boolean
}

function MyUserInput({
  formikName,
  required,
  placeholder,
  label,
  description,
}: Props) {
  return (
    <Field name={formikName}>
      {({ field, meta }: FieldProps) => {
        return (
          <InputWrapper
            required={required}
            size='sm'
            label={label || 'User Name'}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input
              size='sm'
              placeholder={placeholder || 'chose you user name'}
              {...field}
            />
          </InputWrapper>
        )
      }}
    </Field>
  )
}

export default MyUserInput
