import { useEffect, useState } from 'react'
import { Field, FieldProps, useField } from 'formik'
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates'
import { Text } from '@mantine/core'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  required?: boolean
}

export function MyDateRangePicker({ formikName, required = true }: Props) {
  const [field, meta, helpers] = useField(formikName)

  const [value, setValue] = useState<DateRangePickerValue>(field.value)

  useEffect(() => {
    helpers.setValue(value)
  }, [value])

  return (
    <>
      <DateRangePicker
        placeholder="Pick dates range"
        required={required}
        // @ts-ignore
        label="Range"
        description={'select from and to dates'}
        value={value}
        onChange={setValue}
      />
      {meta.error && <Text color={'red'}>{meta.error}</Text>}
    </>
  )
}
