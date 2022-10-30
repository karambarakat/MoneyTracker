import { Checkbox as MCheckbox, Input } from '@mantine/core'
import { Field, FieldProps } from 'formik'

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
          <Input.Wrapper
            required={required}
            size="sm"
            // label={label || 'User Name'}
            description={description}
            error={meta.touched && meta.error}
          >
            <MCheckbox
              label={label}
              size="sm"
              placeholder={placeholder || 'chose you user name'}
              {...field}
            />
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyCheckbox
