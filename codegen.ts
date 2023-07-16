import { getStrapiURL } from '@/lib/media';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: getStrapiURL('/graphql'),
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        fetcher: '@/lib/fetcher#fetcher',
        exposeFetcher: true,
        exposeQueryKeys: true,
        addInfiniteQuery: true,
        dedupeFragments: true,
      },
    },
  },
};

export default config;
