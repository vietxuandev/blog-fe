import { CkContent } from '@/components/CkContent';
import { CommentListItem } from '@/components/CommentListItem';
import {
  useArticlesQuery,
  useCommentsQuery,
  useCreateCommentMutation,
} from '@/generated/graphql';
// import { getStaticPropsFunc } from '@/lib/next-static-props';
import {
  Box,
  Button,
  Card,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
// import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { NextImage } from '@/components/NextImage';
import { Seo } from '@/components/Seo';

type Comment = { name: string; content: string };

const schema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    content: yup.string().required('Vui lòng nhập nội dung bình luận'),
  })
  .required();

export default function ArticleDetail() {
  const router = useRouter();

  const { slug } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Comment>({
    resolver: yupResolver(schema),
  });

  const { data } = useArticlesQuery({
    filters: {
      slug: { eq: String(slug) },
    },
  });

  const { data: commentsData, refetch } = useCommentsQuery({
    filters: {
      article: {
        slug: { eq: String(slug) },
      },
    },
    sort: 'createdAt:desc',
  });

  const { mutate } = useCreateCommentMutation();

  const onSubmit: SubmitHandler<Comment> = (variables) => {
    mutate(
      {
        data: { ...variables, article: data?.articles?.data?.[0].id },
      },
      {
        onSuccess: () => {
          refetch();
          reset();
        },
      }
    );
  };

  const seo = {
    metaTitle: data?.articles?.data?.[0].attributes?.title ?? '',
    metaDescription: data?.articles?.data?.[0].attributes?.description ?? '',
    shareImage: data?.articles?.data?.[0].attributes?.image,
    article: true,
  };

  return (
    <>
      <Seo seo={seo} />
      {data?.articles?.data?.[0].attributes?.image?.data && (
        <Card sx={{ position: 'relative', height: 400 }}>
          <NextImage image={data.articles.data[0].attributes.image.data} />
        </Card>
      )}
      {data?.articles?.data[0].attributes?.title && (
        <Typography
          mt={2}
          variant="h4"
          component="h4"
          sx={{ textAlign: 'center' }}
          fontWeight="bold"
        >
          {data.articles.data[0].attributes.title}
        </Typography>
      )}
      <CkContent content={data?.articles?.data?.[0].attributes?.content} />
      <Paper variant="outlined" sx={{ mt: 2 }}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          pt={2}
          px={2}
          display="flex"
          flexDirection="column"
        >
          <Typography fontWeight="bold">Bình luận</Typography>
          <TextField
            label="Tên"
            fullWidth
            margin="normal"
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            size="small"
          />
          <TextField
            label="Nội dung"
            fullWidth
            margin="normal"
            {...register('content')}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
            multiline
            size="small"
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ ml: 'auto' }}>
            Bình luận
          </Button>
        </Box>
        <List>
          {commentsData?.comments?.data.map((comment) => (
            <CommentListItem
              key={comment.id}
              name={comment.attributes?.name ?? ''}
              content={comment.attributes?.content ?? ''}
              createdAt={comment.attributes?.createdAt}
            />
          ))}
        </List>
      </Paper>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const queryClient = new QueryClient();
//   const data = await queryClient.fetchQuery(
//     useArticlesQuery.getKey(),
//     useArticlesQuery.fetcher()
//   );

//   return {
//     paths: (data.articles?.data ?? []).map((article) => ({
//       params: {
//         slug: article.attributes?.slug ?? '',
//       },
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps = getStaticPropsFunc(
//   async ({ queryClient, params }) => {
//     const variables = {
//       filters: {
//         chap: { slug: { eq: params?.slug } },
//       },
//     };

//     await queryClient.prefetchQuery(
//       useArticlesQuery.getKey(variables),
//       useArticlesQuery.fetcher(variables)
//     );

//     return {};
//   }
// );
