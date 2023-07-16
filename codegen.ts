import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:1337/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: {
          endpoint: 'http://localhost:1337/graphql',
          fetchParams: {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        },
        exposeFetcher: true,
        exposeQueryKeys: true,
        addInfiniteQuery: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
