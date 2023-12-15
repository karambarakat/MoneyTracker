import 'twin.macro'
import { capitalCase } from 'change-case'
import { FieldRoot, Input, requiredInput, useFieldContext } from './_Field'

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

export default function SimpleNumberField(props: Props) {
  return (
    <FieldRoot
      validate={v => {
        if (v && !/^\d+$/.test(v)) {
          return 'Invalid number'
        }
      }}
      name={props.name}
      title={props.title}
    >
      <Input children={Inner} />
    </FieldRoot>
  )
}

function Inner(passed: requiredInput) {
  const { props, meta_ext, actions } = useFieldContext()

  meta_ext.title

  return (
    <input
      {...passed}
      {...props}
      value={props.value || ''}
      required={meta_ext.req}
      placeholder={meta_ext.title}
      onChange={event => {
        const value = event.target.value

        const valueNum = Number(value)

        const inValid = isNaN(valueNum)

        if (inValid) {
          actions.setError('is not valid number')
          actions.setValue(value)
          return
        }

        actions.setValue(valueNum)
      }}
    />
  )
}
