import {
  Input,
  InputWrapper,
  NumberInput,
  NumberInputProps,
  Textarea,
  TextInput,
} from '@mantine/core'
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
          <InputWrapper
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
          </InputWrapper>
        )
      }}
    </Field>
  )
}

export default MyTextarea
