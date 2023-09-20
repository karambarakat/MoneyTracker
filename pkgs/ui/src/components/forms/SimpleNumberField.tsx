import 'twin.macro'
import { capitalCase } from 'change-case'
import { FieldRoot, Input } from './_Field'

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
      <Input>
        {p => (
          <input placeholder={props.title || capitalCase(props.name)} {...p} />
        )}
      </Input>
    </FieldRoot>
  )
}
