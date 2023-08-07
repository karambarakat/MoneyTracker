import 'twin.macro'

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

export default function HiddenField(props: Props) {
  return (
    <div tw="hidden">
      {/* <FieldEx name={props.name} /> */}
      {/* <input type="hidden" /> */}
      {/* </FieldEx> */}
    </div>
  )
}
