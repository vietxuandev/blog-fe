import { QueryClient } from '@tanstack/react-query';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticPropsContext,
} from 'next';

export const getStaticPathsFunc = (
  fetchPaths: (
    context: GetStaticPathsContext & {
      queryClient: QueryClient;
    }
  ) => Promise<GetStaticPathsResult['paths']>
): GetStaticPaths => {
  return async (context: GetStaticPropsContext) => {
    const queryClient = new QueryClient();

    const paths = await fetchPaths({ ...context, queryClient });

    return {
      paths,
      fallback: 'blocking',
    };
  };
};
