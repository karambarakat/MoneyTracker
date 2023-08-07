import 'twin.macro'
import {
  CancelFieldValue,
  FieldBase,
  FieldError,
  field_icon_css,
  FieldInfo,
  FieldProps,
  FieldRoot,
  Input,
  Label,
} from './_Field'
import { EyeOff, Eye } from 'tabler-icons-react'
import { useState } from 'react'

interface Props extends FieldProps {
  info?: string
}

export default function SecretField({ info, ...props }: Props) {
  const [visible, setVisible] = useState(false)
  return (
    <FieldRoot {...props}>
      <FieldBase>
        <div tw="flex gap-1 items-center">
          <div tw="flex-1">
            <Label />
            <Input asChild>
              <input type={visible ? 'text' : 'password'} />
            </Input>
          </div>
          <CancelFieldValue />
          <div onClick={() => setVisible(o => !o)} css={field_icon_css}>
            {visible ? <EyeOff /> : <Eye />}
          </div>
          {/* <EyeOff /> */}
        </div>
      </FieldBase>
      <FieldError />
      <FieldInfo>{info}</FieldInfo>
    </FieldRoot>
  )
}
