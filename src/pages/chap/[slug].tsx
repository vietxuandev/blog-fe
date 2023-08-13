import { Box, Card, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import {
  useTopicsQuery,
  useChapsQuery,
  useInfiniteTopicsQuery,
} from '@/generated/graphql';
import {
  getStaticPropsFunc,
  getNextPageParamFunc,
  getStaticPathsFunc,
} from '@/lib';
import { Seo, NextImage, ArticleCard } from '@/components';
import { defaultVariablesWithSort } from '@/constants';
import { useInfinityScroll } from '@/hooks';

export default function ChapDetail() {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useChapsQuery({
    filters: {
      slug: { eq: String(slug) },
    },
  });

  const { data: topicsData, fetchNextPage } = useInfiniteTopicsQuery(
    'pagination',
    {
      ...defaultVariablesWithSort,
      filters: {
        chap: {
          slug: { eq: String(slug) },
        },
      },
    },
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.topics?.meta.pagination),
    }
  );

  const ref = useInfinityScroll(fetchNextPage);

  const seo = {
    metaTitle: data?.chaps?.data?.[0].attributes?.title ?? '',
    metaDescription: data?.chaps?.data?.[0].attributes?.description ?? '',
    shareImage: data?.chaps?.data?.[0].attributes?.image,
  };

  return (
    <>
      <Seo seo={seo} />
      {data?.chaps?.data?.[0].attributes?.image?.data && (
        <Card sx={{ position: 'relative', pb: '50%' }}>
          <NextImage image={data.chaps.data[0].attributes.image.data} />
        </Card>
      )}
      <Box mb={2}>
        <Typography mt={2} variant="h5" component="h5" fontWeight="bold">
          {data?.chaps?.data?.[0].attributes?.title ?? ''}
        </Typography>
        <Typography variant="body2">
          {data?.chaps?.data?.[0].attributes?.description ?? ''}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {topicsData?.pages.map((page) =>
          page.topics?.data.map((topic) => (
            <Grid key={topic.id} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard
                title={topic.attributes?.title ?? ''}
                description={topic.attributes?.description ?? ''}
                href={`/topic/${topic.attributes?.slug ?? ''}`}
                image={topic.attributes?.image.data}
                publishedAt={topic.attributes?.publishedAt}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box ref={ref} />
    </>
  );
}

export const getStaticPaths = getStaticPathsFunc(async ({ queryClient }) => {
  const { chaps } = await queryClient.fetchQuery(
    useChapsQuery.getKey(),
    useChapsQuery.fetcher()
  );

  return (
    chaps?.data.map((chap) => ({
      params: {
        slug: chap.attributes?.slug ?? '',
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

    const topicsVariables = {
      ...defaultVariablesWithSort,
      filters: {
        chap: { slug: { eq: String(params?.slug) } },
      },
    };

    await queryClient.prefetchQuery(
      useChapsQuery.getKey(variables),
      useChapsQuery.fetcher(variables)
    );

    await queryClient.prefetchQuery(
      useInfiniteTopicsQuery.getKey(topicsVariables),
      useTopicsQuery.fetcher(topicsVariables)
    );

    return {};
  }
);
