import { Input, NumberInput, NumberInputProps, TextInput } from '@mantine/core'
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

function MyAmountInput({
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
            label={label || 'Amount'}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input
              // parser={(value) => (value || '').replace(/\$\s?|(,*)/g, '')}
              // formatter={(value) =>
              //   !Number.isNaN(parseFloat(value || ''))
              //     ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              //     : '$ '
              // }
              icon="$"
              type={'number'}
              size="sm"
              placeholder={placeholder || 'Enter The Money Amount'}
              {...field}
            />
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyAmountInput
