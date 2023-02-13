interface categoryFields {
  title: string
  color?: string
  icon?: string
}

export type category_create = categoryFields
export type category_update = Partial<categoryFields>
