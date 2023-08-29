const config = {
  schema: './schema.json',
  generates: {
    './gql/': {
      preset: 'client',
    },
  },
}
export default config
