import '@/styles/globals.css';
import '@/styles/content-styles.css';
import Head from 'next/head';
import App, { AppContext, type AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';
import theme from '@/styles/theme';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { Layout } from '@/layouts/Layout';
import { GlobalContext } from '@/contexts/global';
import { useGlobalQuery } from '@/generated/graphql';
import { getStrapiFile } from '@/lib/media';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const { global } = pageProps;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Change title in _app.tsx</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {global?.attributes?.favicon?.data && (
          <link
            rel="shortcut icon"
            href={getStrapiFile(global.attributes.favicon.data)}
          />
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <GlobalContext.Provider value={{ ...global?.attributes }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </GlobalContext.Provider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.getInitialProps = async (ctx: AppContext) => {
  const queryClient = new QueryClient();

  const data = await queryClient.fetchQuery(
    useGlobalQuery.getKey(),
    useGlobalQuery.fetcher()
  );

  const appProps = await App.getInitialProps(ctx);
  return {
    ...appProps,
    pageProps: {
      global: data.global?.data,
    },
  };
};
