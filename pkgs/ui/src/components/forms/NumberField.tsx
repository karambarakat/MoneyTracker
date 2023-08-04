import 'twin.macro'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { Field } from './Form'
import { useField, useFormik, useFormikContext } from 'formik'

interface Props {
  /**
   * name of the field could be nested or not
   * @example 'email', 'address.street' or 'friends[0].name
   */
  name: string
  /**
   * displayed title, if not provided will be generated from name
   */
  title?: string
}

export default function NumberField(props: Props) {
  return (
    <Field
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        if (value && !/^\d+$/.test(value)) {
          return 'Invalid number'
        }
      }}
    />
  )
}
