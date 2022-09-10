import { ActionIcon, Box, Input, ScrollArea } from '@mantine/core'
import { Field, FieldProps, useFormikContext } from 'formik'
import * as AllIcons from '../CategoryAllTabler'
import type * as AllIconsTypes from '../CategoryAllTabler'
import { IconProps } from 'tabler-icons-react'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  label: string
  description?: string
  required?: boolean
}

function MyIconInput({ formikName, required, label, description }: Props) {
  const formikProps = useFormikContext<{ color?: string }>()

  return (
    <Field name={formikName}>
      {({ field, meta }: FieldProps) => {
        return (
          <Input.Wrapper
            required={required}
            size="sm"
            label={label}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input
              styles={{ input: { height: '200px' } }}
              component="div"
              size="sm"
            >
              <ScrollArea
                offsetScrollbars
                style={{ height: '200px', overflowX: 'hidden' }}
              >
                <Box
                  py={12}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                    gap: '12px',
                    justifyItems: 'center',
                    alignItems: 'center',
                  }}
                >
                  {Object.keys(AllIcons).map((icon) => {
                    // @ts-ignore
                    const Icon: React.FC<IconProps> = AllIcons[icon]

                    return (
                      <ActionIcon
                        size={38}
                        variant={field.value === icon ? 'filled' : 'subtle'}
                        onClick={() => {
                          formikProps.setFieldValue(formikName, icon)
                        }}
                        radius="xl"
                        //
                        color={formikProps.values?.color || 'dark'}
                      >
                        <Icon style={{ margin: '8px' }} />
                      </ActionIcon>
                    )
                  })}
                </Box>
              </ScrollArea>
            </Input>
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyIconInput
