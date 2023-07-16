import { ArticleCard } from '@/components/ArticleCard';
import { useArticlesQuery } from '@/generated/graphql';
import { Container, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { getStrapiFile } from '@/lib/media';

export default function SearchPage() {
  const router = useRouter();

  const { q } = router.query;

  const { data } = useArticlesQuery({
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
    sort: 'createdAt:desc',
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {data?.articles?.data.map((article) => (
          <Grid key={article.id} item xs={12} sm={6} md={4} lg={3}>
            <ArticleCard
              title={article.attributes?.title ?? ''}
              description={article.attributes?.description ?? ''}
              slug={article.attributes?.slug ?? ''}
              image={getStrapiFile(article.attributes?.image.data)}
              publishedAt={article.attributes?.publishedAt}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
