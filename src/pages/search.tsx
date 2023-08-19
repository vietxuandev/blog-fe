import { Box, Grid } from '@mui/material';
import { useRouter } from 'next/router';

import { ArticleCard } from '@/components';
import { useInfiniteArticlesQuery } from '@/generated/graphql';
import { defaultVariablesWithSort } from '@/constants';
import { useInfinityScroll } from '@/hooks';
import { getNextPageParamFunc } from '@/lib';

export default function SearchPage() {
  const router = useRouter();

  const { q } = router.query;

  const { data, isFetching, isLoading, fetchNextPage } =
    useInfiniteArticlesQuery(
      'pagination',
      {
        ...defaultVariablesWithSort,
        filters: {
          or: [
            {
              title: {
                containsi: String(q),
              },
            },
            {
              description: {
                containsi: String(q),
              },
            },
          ],
        },
      },
      {
        getNextPageParam: (lastPage) =>
          getNextPageParamFunc(lastPage.articles?.meta.pagination),
      }
    );

  const ref = useInfinityScroll(fetchNextPage);

  return (
    <>
      <Grid container spacing={2}>
        {data?.pages.map((page) =>
          page.articles?.data.map((article) => (
            <Grid key={article.id} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard
                title={article.attributes?.title ?? ''}
                description={article.attributes?.description ?? ''}
                href={`/article/${article.attributes?.slug ?? ''}`}
                image={article.attributes?.image.data}
                publishedAt={article.attributes?.publishedAt}
              />
            </Grid>
          ))
        )}
        {(isLoading || isFetching) &&
          Array(12)
            .fill(null)
            .map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ArticleCard isLoading />
              </Grid>
            ))}
      </Grid>
      <Box ref={ref} />
    </>
  );
}
