import { Checkbox as MCheckbox, InputWrapper } from '@mantine/core'
import { Field, FieldProps } from 'formik'

interface Props {
  formikName: string
  placeholder?: string
  label?: string
  description?: string
  required?: boolean
}

function MyCheckbox({
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
            // label={label || 'User Name'}
            description={description}
            error={meta.touched && meta.error}
          >
            <MCheckbox
              label={label}
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

export default MyCheckbox
