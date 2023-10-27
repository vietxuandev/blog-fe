import { Box, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import {
  useTopicsQuery,
  useInfiniteArticlesQuery,
  useArticlesQuery,
} from '@/generated/graphql';
import {
  getStaticPropsFunc,
  getStaticPathsFunc,
  getNextPageParamFunc,
} from '@/lib';
import { Seo, NextImage, ArticleCard } from '@/components';
import { defaultVariablesWithSort } from '@/constants';
import { useInfinityScroll } from '@/hooks';

export default function TopicDetail() {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useTopicsQuery({
    filters: {
      slug: { eq: String(slug) },
    },
  });

  const {
    data: articlesData,
    fetchNextPage,
    isLoading,
    isFetching,
  } = useInfiniteArticlesQuery(
    'pagination',
    {
      ...defaultVariablesWithSort,
      filters: {
        topic: {
          slug: { eq: String(slug) },
        },
      },
    },
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.articles?.meta.pagination),
    }
  );

  const ref = useInfinityScroll(fetchNextPage);

  const seo = {
    metaTitle: data?.topics?.data?.[0].attributes?.title ?? '',
    metaDescription: data?.topics?.data?.[0].attributes?.description ?? '',
    shareImage: data?.topics?.data?.[0].attributes?.image,
  };

  return (
    <>
      <Seo seo={seo} />
      {data?.topics?.data?.[0].attributes?.image?.data && (
        <Card sx={{ position: 'relative', pb: '50%' }}>
          <NextImage image={data.topics.data[0].attributes.image.data} />
        </Card>
      )}
      <Box mb={2}>
        <Typography mt={2} variant="h5" component="h5" fontWeight="bold">
          {data?.topics?.data?.[0].attributes?.title ?? ''}
        </Typography>
        <Typography variant="body2">
          {data?.topics?.data?.[0].attributes?.description ?? ''}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {articlesData?.pages.map((page) =>
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

export const getStaticPaths = getStaticPathsFunc(async ({ queryClient }) => {
  const { topics } = await queryClient.fetchQuery(
    useTopicsQuery.getKey(),
    useTopicsQuery.fetcher()
  );

  return (
    topics?.data.map((topic) => ({
      params: {
        slug: topic.attributes?.slug ?? '',
      },
    })) ?? []
  );
});

export const getStaticProps = getStaticPropsFunc(
  async ({ queryClient, params }) => {
    const variables = {
      filters: {
        slug: { eq: String(params?.slug) },
      },
    };

    const articlesVariables = {
      ...defaultVariablesWithSort,
      filters: {
        topic: {
          slug: { eq: String(params?.slug) },
        },
      },
    };

    await queryClient.prefetchQuery(
      useTopicsQuery.getKey(variables),
      useTopicsQuery.fetcher(variables)
    );

    await queryClient.prefetchQuery(
      useInfiniteArticlesQuery.getKey(articlesVariables),
      useArticlesQuery.fetcher(articlesVariables)
    );

    return {};
  }
);
