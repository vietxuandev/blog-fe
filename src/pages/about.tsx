import { CkContent } from '@/components';
// import { getStaticPropsFunc } from '@/lib';
import { useAboutQuery } from '@/generated/graphql';
import { Typography } from '@mui/material';

export default function AboutPage() {
  const { data } = useAboutQuery();
  return (
    <>
      <Typography
        mt={2}
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center' }}
        fontWeight="bold"
      >
        Giới thiệu
      </Typography>
      <CkContent content={data?.about?.data?.attributes?.content} />
    </>
  );
}

// export const getStaticProps = getStaticPropsFunc(async ({ queryClient }) => {
//   await queryClient.prefetchQuery(
//     useAboutQuery.getKey(),
//     useAboutQuery.fetcher()
//   );

//   return {};
// });
