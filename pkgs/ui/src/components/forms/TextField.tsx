import 'twin.macro'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import {
  CancelFieldValue,
  FieldBase,
  FieldError,
  FieldInfo,
  FieldRoot,
  Input,
  Title,
} from './_Field'

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

export default function TextField(props: Props) {
  return (
    <FieldRoot name={props.name} title={props.title}>
      <div>
        <FieldBase>
          <div tw="flex gap-3 items-center">
            <div tw="flex-1">
              <Title />
              <Input />
            </div>
            <CancelFieldValue />
          </div>
        </FieldBase>
        <FieldError />
        <FieldInfo />
      </div>
    </FieldRoot>
  )
}
