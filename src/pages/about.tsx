import { CkContent } from '@/components/CkContent';
// import { getStaticPropsFunc } from '@/lib/next-static-props';
import { useAboutQuery } from '@/generated/graphql';

export default function AboutPage() {
  const { data } = useAboutQuery();
  return (
    <>
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
