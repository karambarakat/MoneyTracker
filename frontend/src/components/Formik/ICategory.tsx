import { Box, Input, ScrollArea } from '@mantine/core'
import { Field, FieldProps, useFormikContext } from 'formik'
import CategoryIcon from '@components/category/CategoryIcon'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  label: string
  description?: string
  required?: boolean
}

function MyCategoryInput({ formikName, required, label, description }: Props) {
  const cats = CategoryIcon.collection.useAllCats()
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
                style={{ maxHeight: '200px', overflowX: 'hidden' }}
              >
                <Box
                  py={12}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(46px, 1fr))',
                    gap: '12px',
                    justifyItems: 'center',
                    alignItems: 'center',
                  }}
                >
                  {cats.map((cat) => (
                    <div
                      key={cat._id}
                      onClick={() => {
                        formikProps.setFieldValue(formikName, cat._id)
                      }}
                    >
                      <CategoryIcon.Hoverable>
                        <CategoryIcon
                          size={38}
                          on={field.value === cat._id}
                          cat={cat}
                        />
                      </CategoryIcon.Hoverable>
                    </div>
                  ))}
                </Box>
              </ScrollArea>
            </Input>
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyCategoryInput
