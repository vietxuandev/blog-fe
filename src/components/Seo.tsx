import Head from 'next/head';

import { SeoFragment, useGlobalQuery } from '@/generated/graphql';
import { getStrapiFile } from '@/lib';

interface SeoProps {
  seo: SeoFragment & {
    article?: boolean;
  };
}

export function Seo({ seo }: SeoProps) {
  const { data } = useGlobalQuery();

  const seoWithDefaults = {
    ...data?.global?.data?.attributes?.defaultSeo,
    ...seo,
  };

  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle} | ${
      data?.global?.data?.attributes?.siteName ?? ''
    }`,
  };

  return (
    <Head>
      {data?.global?.data?.attributes?.favicon.data && (
        <link
          rel="shortcut icon"
          href={getStrapiFile(data.global.data.attributes.favicon.data)}
        />
      )}
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta
            property="og:image"
            content={getStrapiFile(fullSeo.shareImage.data)}
          />
          <meta
            name="twitter:image"
            content={getStrapiFile(fullSeo.shareImage.data)}
          />
          <meta name="image" content={getStrapiFile(fullSeo.shareImage.data)} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
