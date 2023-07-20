import {
  ArticlesQueryVariables,
  // useChapsQuery,
  useHomepageQuery,
  useInfiniteChapsQuery,
  useMenuQuery,
} from '@/generated/graphql';
import { getStrapiFile } from '@/lib/media';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { ChapCard } from '@/components/ChapCard';
import { Seo } from '@/components/Seo';
// import { getStaticPropsFunc } from '@/lib/next-static-props';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@/components/Link';

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

  const { data: menuData } = useMenuQuery();

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
      <Grid container spacing={3}>
        <Grid item sm={12} md={4}>
          <Typography
            mt={2}
            variant="h5"
            component="h5"
            mb={1}
            fontWeight="bold"
          >
            Chương
          </Typography>
          {menuData?.chaps?.data.map((chap) => (
            <Accordion key={chap.attributes?.slug}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography whiteSpace="normal">
                  {chap.attributes?.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="h6" component="h6" fontWeight="bold">
                  Chủ đề
                </Typography>
                {chap.attributes?.topics?.data.map((topic) => (
                  <Accordion key={topic.attributes?.slug}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography whiteSpace="pre-wrap">
                        {topic.attributes?.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography fontWeight="bold">Bài viết</Typography>
                      <List sx={{ p: 0 }}>
                        {topic.attributes?.articles?.data.map((article) => (
                          <ListItem
                            key={article.attributes?.slug}
                            disablePadding
                            divider
                          >
                            <ListItemButton
                              LinkComponent={Link}
                              href={`/article/${
                                article.attributes?.slug ?? ''
                              }`}
                            >
                              <ListItemText
                                primary={article.attributes?.title}
                              />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
        <Grid item sm={12} md={8}>
          <Typography
            mt={2}
            variant="h5"
            component="h5"
            mb={1}
            fontWeight="bold"
          >
            Danh sách chương
          </Typography>
          <Grid container spacing={2}>
            {data?.pages.map((page) =>
              page.chaps?.data.map((chap) => (
                <Grid key={chap.id} item sm={12} md={6} lg={4}>
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
        </Grid>
      </Grid>
    </>
  );
}

// export const getStaticProps = getStaticPropsFunc(async ({ queryClient }) => {
//   await queryClient.prefetchQuery(
//     useChapsQuery.getKey(variables),
//     useChapsQuery.fetcher(variables)
//   );

//   await queryClient.prefetchQuery(
//     useHomepageQuery.getKey(),
//     useHomepageQuery.fetcher()
//   );

//   return {};
// });
