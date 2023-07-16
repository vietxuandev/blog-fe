import {
  ArticlesQueryVariables,
  useChapsQuery,
  useHomepageQuery,
  useInfiniteChapsQuery,
} from '@/generated/graphql';
import { getStrapiFile } from '@/lib/media';
import { Grid, Typography } from '@mui/material';
import { ChapCard } from '@/components/ChapCard';
import { Seo } from '@/components/Seo';
import { getStaticPropsFunc } from '@/lib/next-static-props';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const pageSize = 20;

const variables: ArticlesQueryVariables = {
  pagination: {
    page: 1,
    pageSize,
  },
};

export default function Home() {
  const { data, fetchNextPage } = useInfiniteChapsQuery(
    'pagination',
    variables,
    {
      getNextPageParam(lastPage) {
        const page = lastPage.chaps?.meta.pagination.page ?? 0;
        const pageCount = lastPage.chaps?.meta.pagination.pageCount ?? 0;
        if (page < pageCount) {
          return {
            pagination: {
              page: (lastPage.chaps?.meta.pagination.page ?? 0) + 1,
              pageSize,
            },
          };
        }
      },
    }
  );

  const { data: homePageData } = useHomepageQuery();

  const ref = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(ref, {});

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, isVisible]);

  return (
    <>
      {homePageData?.homepage?.data?.attributes?.seo && (
        <Seo seo={homePageData.homepage.data.attributes?.seo} />
      )}
      <Typography mt={2} variant="h5" component="h5" mb={1} fontWeight="bold">
        Danh sách chương
      </Typography>
      <Grid container spacing={2}>
        {data?.pages.map((page) =>
          page.chaps?.data.map((chap) => (
            <Grid key={chap.id} item xs={12} sm={6} md={4} lg={3}>
              <ChapCard
                title={chap.attributes?.title ?? ''}
                description={chap.attributes?.description ?? ''}
                slug={chap.attributes?.slug ?? ''}
                image={getStrapiFile(chap.attributes?.image.data)}
                publishedAt={chap.attributes?.publishedAt}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export const getStaticProps = getStaticPropsFunc(async ({ queryClient }) => {
  await queryClient.prefetchQuery(
    useChapsQuery.getKey(variables),
    useChapsQuery.fetcher(variables)
  );

  await queryClient.prefetchQuery(
    useHomepageQuery.getKey(),
    useHomepageQuery.fetcher()
  );

  return {};
});
