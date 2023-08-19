import {
  Banner,
  Footer,
  ProgressBar,
  ScrollTop,
  SearchAppBar,
} from '@/components';
import { Box, Container, Paper, Toolbar } from '@mui/material';
import { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
  window?: () => Window;
}

export const Layout = ({ children, window }: LayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ProgressBar />
      <SearchAppBar window={window} />
      <Toolbar id="back-to-top-anchor" />
      <Banner />
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <Paper elevation={0} sx={{ p: 2 }}>
          {children}
        </Paper>
      </Container>
      <ScrollTop window={window} />
      <Footer />
    </Box>
  );
};
