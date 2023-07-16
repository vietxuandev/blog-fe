import { ArticleCard } from '@/components/ArticleCard';
import {
  useArticlesQuery,
  useChapsQuery,
  useInfiniteArticlesQuery,
} from '@/generated/graphql';
import { Box, Card, Grid, Typography } from '@mui/material';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getStrapiFile } from '@/lib/media';
import { getStaticPropsFunc } from '@/lib/next-static-props';
import { Seo } from '@/components/Seo';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';
import { NextImage } from '@/components/NextImage';

const pageSize = 20;

const pagination = {
  page: 1,
  pageSize,
};

export default function ChapDetail() {
  const router = useRouter();

  const { slug } = router.query;

  const { data } = useChapsQuery({
    filters: {
      slug: { eq: String(slug) },
    },
  });

  const { data: articlesData, fetchNextPage } = useInfiniteArticlesQuery(
    'pagination',
    {
      filters: {
        chap: {
          slug: { eq: String(slug) },
        },
      },
      pagination,
      sort: 'createdAt:desc',
    },
    {
      getNextPageParam(lastPage) {
        const page = lastPage.articles?.meta.pagination.page ?? 0;
        const pageCount = lastPage.articles?.meta.pagination.pageCount ?? 0;
        if (page < pageCount) {
          return {
            pagination: {
              page: (lastPage.articles?.meta.pagination.page ?? 0) + 1,
              pageSize,
            },
          };
        }
      },
    }
  );

  const ref = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(ref, {});

  const isVisible = !!entry?.isIntersecting;

  const seo = {
    metaTitle: data?.chaps?.data?.[0].attributes?.title ?? '',
    metaDescription: data?.chaps?.data?.[0].attributes?.description ?? '',
    shareImage: data?.chaps?.data?.[0].attributes?.image,
    article: true,
  };

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, isVisible]);

  return (
    <>
      <Seo seo={seo} />
      {data?.chaps?.data?.[0].attributes?.image?.data && (
        <Card sx={{ position: 'relative', height: 400 }}>
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
        {articlesData?.pages.map((page) =>
          page.articles?.data.map((article) => (
            <Grid key={article.id} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard
                title={article.attributes?.title ?? ''}
                description={article.attributes?.description ?? ''}
                slug={article.attributes?.slug ?? ''}
                image={getStrapiFile(article.attributes?.image.data)}
                publishedAt={article.attributes?.publishedAt}
              />
            </Grid>
          ))
        )}
      </Grid>
      <Box ref={ref} />
    </>
  );
}

export const getStaticPaths = async () => {
  const queryClient = new QueryClient();

  const articlesData = await queryClient.fetchQuery(
    useChapsQuery.getKey(),
    useChapsQuery.fetcher()
  );

  return {
    paths: (articlesData.chaps?.data ?? []).map((chap) => ({
      params: {
        slug: chap.attributes?.slug ?? '',
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = getStaticPropsFunc(
  async ({ queryClient, params }) => {
    const variables = {
      filters: {
        slug: { eq: params?.slug },
      },
    };

    const articlesVariables = {
      filters: {
        chap: { slug: { eq: params?.slug } },
      },
      pagination,
    };

    await queryClient.prefetchQuery(
      useChapsQuery.getKey(variables),
      useChapsQuery.fetcher(variables)
    );

    await queryClient.prefetchQuery(
      useArticlesQuery.getKey(articlesVariables),
      useArticlesQuery.fetcher(articlesVariables)
    );
    return {};
  }
);
