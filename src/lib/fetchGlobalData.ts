import { useGlobalQuery } from '@/generated/graphql';
import { QueryClient } from '@tanstack/react-query';

export async function fetchGlobalData() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    useGlobalQuery.getKey(),
    useGlobalQuery.fetcher()
  );
}
