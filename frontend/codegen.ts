import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.FRONTEND_BFF_ENDPOINT_GRAPHQL_HTTP,
  documents: 'lib/graphql/**/*.graphql',
  generates: {
    'lib/generated/graphql/@types/index.ts': {
      plugins: ['typescript'],
    },
    'lib/generated/graphql/graphql.schema.json': {
      plugins: ['introspection'],
    },
    'lib/generated/graphql/sdk.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-graphql-request',
        'plugin-typescript-swr',
      ],
    },
  },
}

export default config
