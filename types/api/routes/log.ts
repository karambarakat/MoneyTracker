interface logFields {
  title: string
  amount: number
  category?: string
  note?: string
}

export type log_create = logFields
export type log_update = Partial<logFields>
