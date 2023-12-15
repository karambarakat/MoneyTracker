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

export default function SimpleTextField({ name, title, ...props }: Props) {
  return (
    <FieldRoot name={name} title={title}>
      <Input {...props}>
        {p => <input placeholder={title || capitalCase(name)} {...p} />}
      </Input>
    </FieldRoot>
  )
}
