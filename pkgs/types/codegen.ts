import type { CodegenConfig } from '@graphql-codegen/cli'

const config = {
  schema: './schema.json',
  documents: ['./fragments.ts'],
  generates: {
    './gql/': {
      preset: 'client',
    },
  },
} satisfies CodegenConfig

export default config
