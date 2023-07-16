import { QParams } from '@/typings/global';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticProps, GetStaticPropsContext } from 'next';

export interface Context extends GetStaticPropsContext<QParams> {
  queryClient: QueryClient;
}

export const getStaticPropsFunc = <P extends Record<string, unknown>>(
  fetchProps: (context: Context) => Promise<P>
): GetStaticProps<P> => {
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
