import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FacebookShareButton } from 'react-share';
import { Facebook } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  List,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { CkContent, CommentListItem, NextImage, Seo } from '@/components';
import {
  useArticlesQuery,
  useCreateCommentMutation,
  useInfiniteCommentsQuery,
} from '@/generated/graphql';
import {
  getStaticPropsFunc,
  getStaticPathsFunc,
  getNextPageParamFunc,
} from '@/lib';
import { defaultVariablesWithSort } from '@/constants';
import { useInfinityScroll } from '@/hooks';

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

  const {
    data: commentsData,
    refetch,
    fetchNextPage,
    isFetching,
    isLoading,
  } = useInfiniteCommentsQuery(
    'pagination',
    {
      ...defaultVariablesWithSort,
      filters: {
        article: {
          slug: { eq: String(slug) },
        },
      },
    },
    {
      getNextPageParam: (lastPage) =>
        getNextPageParamFunc(lastPage.comments?.meta.pagination),
    }
  );

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

  const ref = useInfinityScroll(fetchNextPage);

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
        <Card sx={{ position: 'relative', pb: '50%' }}>
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
      <FacebookShareButton
        url={`https://datvanguoibariavungtau.com/article/${
          data?.articles?.data?.[0].attributes?.slug ?? ''
        }`}
      >
        <Box
          display="flex"
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: 'white',
            py: 0.5,
            px: 1,
            borderRadius: 1,
            mt: 1,
          }}
        >
          <Facebook />
          Chia sẻ bài viết
        </Box>
      </FacebookShareButton>
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
          {commentsData?.pages.map((page) =>
            page.comments?.data.map((comment) => (
              <CommentListItem
                key={comment.id}
                name={comment.attributes?.name ?? ''}
                content={comment.attributes?.content ?? ''}
                createdAt={comment.attributes?.createdAt}
              />
            ))
          )}
          {(isLoading || isFetching) &&
            Array(4)
              .fill(null)
              .map((_, index) => <CommentListItem key={index} isLoading />)}
        </List>
        <Box ref={ref} />
      </Paper>
    </>
  );
}

export const getStaticPaths = getStaticPathsFunc(async ({ queryClient }) => {
  const { articles } = await queryClient.fetchQuery(
    useArticlesQuery.getKey(),
    useArticlesQuery.fetcher()
  );

  return (
    articles?.data.map((article) => ({
      params: {
        slug: article.attributes?.slug ?? '',
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

    await queryClient.prefetchQuery(
      useArticlesQuery.getKey(variables),
      useArticlesQuery.fetcher(variables)
    );

    return {};
  }
);
