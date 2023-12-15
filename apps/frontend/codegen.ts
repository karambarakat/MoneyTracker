const config = {
  schema: './schema.json',
  generates: {
    './src/api/gql/': {
      preset: 'client',
    },
  },
}
export default config
