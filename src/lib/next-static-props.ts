import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export const getStaticPropsFunc = <P extends Record<string, unknown>>(
  fetchProps: (
    context: GetStaticPropsContext & {
      queryClient: QueryClient;
    }
  ) => Promise<P>
): GetStaticProps => {
  return async (context: GetStaticPropsContext) => {
    const queryClient = new QueryClient();

    const props = await fetchProps({ ...context, queryClient });

    return {
      props: {
        ...props,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
};
