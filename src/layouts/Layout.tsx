import {
  Banner,
  Footer,
  ProgressBar,
  ScrollTop,
  SearchAppBar,
} from '@/components';
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
      bgcolor="Background"
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
