import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Link from 'next/link';

import {
  // useChapsQuery,
  useHomepageQuery,
  useInfiniteChapsQuery,
  useMenuQuery,
} from '@/generated/graphql';
import { Seo, ArticleCard } from '@/components';
import { getNextPageParamFunc } from '@/lib';
import { useInfinityScroll } from '@/hooks';
import { defaultVariables } from '@/constants';

export default function Home() {
  const { data, fetchNextPage, isLoading, isFetching } = useInfiniteChapsQuery(
    'pagination',
    defaultVariables,
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.chaps?.meta.pagination),
    }
  );

  const { data: homePageData } = useHomepageQuery();

  const { data: menuData } = useMenuQuery();

  const ref = useInfinityScroll(fetchNextPage);

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
            <Accordion key={chap.attributes?.slug} variant="outlined">
              <AccordionSummary
                expandIcon={<ExpandMore />}
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
                  <Accordion key={topic.attributes?.slug} variant="outlined">
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
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
        <Grid item sm={12} md={8} width="100%">
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
                <Grid key={chap.id} item xs={12} md={6} lg={4}>
                  <ArticleCard
                    title={chap.attributes?.title ?? ''}
                    description={chap.attributes?.description ?? ''}
                    href={`/chap/${chap.attributes?.slug ?? ''}`}
                    image={chap.attributes?.image.data}
                    publishedAt={chap.attributes?.publishedAt}
                  />
                </Grid>
              ))
            )}
            {(isLoading || isFetching) &&
              Array(12)
                .fill(null)
                .map((_, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4}>
                    <ArticleCard isLoading />
                  </Grid>
                ))}
          </Grid>
        </Grid>
      </Grid>
      <Box ref={ref} />
    </>
  );
}

// export const getStaticProps = getStaticPropsFunc(async ({ queryClient }) => {
//   await queryClient.prefetchQuery(
//     useChapsQuery.getKey(defaultVariables),
//     useChapsQuery.fetcher(defaultVariables)
//   );

//   await queryClient.prefetchQuery(
//     useHomepageQuery.getKey(),
//     useHomepageQuery.fetcher()
//   );

//   await queryClient.prefetchQuery(
//     useMenuQuery.getKey(),
//     useMenuQuery.fetcher()
//   );

//   return {};
// });
