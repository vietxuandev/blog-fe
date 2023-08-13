import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import {
  alpha,
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  styled,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { useState } from 'react';
import { Home, Info, Menu, Search as SearchIcon } from '@mui/icons-material';

import { Link } from '.';

type Inputs = { q: string };

const schema = yup.object({
  q: yup.string().required(),
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface SearchAppBarProps {
  window?: () => Window;
}

export function SearchAppBar({ window }: SearchAppBarProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (query) => {
    router.push({
      pathname: '/search',
      query,
    });
  };

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(isOpen);
    };

  return (
    <>
      <HideOnScroll window={window}>
        <AppBar>
          <Toolbar>
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Trang chủ
            </Button>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { xs: 'flex', sm: 'none' } }}
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Tìm kiếm..."
                  inputProps={{ 'aria-label': 'search' }}
                  {...register('q')}
                />
              </Search>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="inherit"
              LinkComponent={Link}
              href="/about"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Giới thiệu
            </Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} href="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Trang chủ" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton LinkComponent={Link} href="/about">
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="Giới thiệu" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
