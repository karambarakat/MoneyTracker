import { Input, InputWrapper } from '@mantine/core'
import { Field, FieldProps } from 'formik'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  placeholder: string
  label: string
  description?: string
  required?: boolean
}

function MySimpleInput({
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
            size="sm"
            label={label}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input size="sm" placeholder={placeholder} {...field} />
          </InputWrapper>
        )
      }}
    </Field>
  )
}

export default MySimpleInput
