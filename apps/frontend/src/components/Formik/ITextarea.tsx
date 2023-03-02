import { Input, Textarea } from '@mantine/core'
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

function MyTextarea({
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
            label={label || 'Notes'}
            description={description}
            error={meta.touched && meta.error}
          >
            <Textarea
              autosize
              minRows={3}
              size="sm"
              placeholder={placeholder || 'Enter More Details'}
              {...field}
            />
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyTextarea
