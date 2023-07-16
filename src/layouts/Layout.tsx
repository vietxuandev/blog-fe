import { Banner } from '@/components/Banner';
import { Footer } from '@/components/Footer';
import { ProgressBar } from '@/components/ProgressBar';
import { ScrollTop } from '@/components/ScrollTop';
import { SearchAppBar } from '@/components/SearchAppBar';
import { Box, Container, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
  window?: () => Window;
}

export const Layout = ({ children, window }: LayoutProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="white"
    >
      <ProgressBar />
      <SearchAppBar window={window} />
      <Toolbar id="back-to-top-anchor" />
      <Banner />
      <Container maxWidth="lg" sx={{ my: 2 }}>
        {children}
      </Container>
      <ScrollTop window={window} />
      <Footer />
    </Box>
  );
};
