import { useGlobal } from '@/hooks/useGlobal';
import { Box, Typography } from '@mui/material';
import { NextImage } from './NextImage';

export function Banner() {
  const { banner, defaultSeo } = useGlobal();

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {banner?.data && <NextImage image={banner?.data} />}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          color="white"
          position="relative"
          textAlign="center"
          fontWeight="bold"
          fontSize="36px"
          sx={{
            textShadow: (theme) =>
              `2px 0 ${theme.palette.primary.main}, -2px 0 ${theme.palette.primary.main}, 0 2px ${theme.palette.primary.main}, 0 -2px ${theme.palette.primary.main}, 1px 1px ${theme.palette.primary.main}, -1px -1px ${theme.palette.primary.main}, 1px -1px ${theme.palette.primary.main}, -1px 1px ${theme.palette.primary.main}`,
            px: 2,
          }}
        >
          Trang Văn học địa phương
        </Typography>
        <Typography
          variant="h1"
          fontFamily="Bladekill"
          color="white"
          position="relative"
          textAlign="center"
          sx={{
            textShadow: '5px 5px 8px black',
            px: 2,
          }}
        >
          {defaultSeo?.metaDescription}
        </Typography>
      </Box>
      <Box
        position="absolute"
        sx={{
          left: 0,
          right: 0,
          bottom: 0,
          height: '140px',
        }}
      >
        <Box
          sx={{
            backgroundSize: '50% 100px',
            backgroundImage: 'url(/images/wave-bot.png)',
            position: 'absolute',
            left: 0,
            width: '200%',
            height: '100%',
            backgroundRepeat: 'repeat no-repeat',
            backgroundPosition: '0 bottom',
            transformOrigin: 'center bottom',
            zIndex: 5,
            animation: 'move-wave 15s linear infinite',
          }}
        />
        <Box
          sx={{
            backgroundSize: '50% 120px',
            backgroundImage: 'url(/images/wave-mid.png)',
            position: 'absolute',
            left: 0,
            width: '200%',
            height: '100%',
            backgroundRepeat: 'repeat no-repeat',
            backgroundPosition: '0 bottom',
            transformOrigin: 'center bottom',
            zIndex: 10,
            opacity: 0.75,
            animation: 'move-wave 10s linear infinite',
          }}
        />
        <Box
          sx={{
            backgroundSize: '50% 100px',
            backgroundImage: 'url(/images/wave-top.png)',
            position: 'absolute',
            left: 0,
            width: '200%',
            height: '100%',
            backgroundRepeat: 'repeat no-repeat',
            backgroundPosition: '0 bottom',
            transformOrigin: 'center bottom',
            zIndex: 15,
            opacity: 0.5,
            animationDelay: '1s',
          }}
        />
      </Box>
    </Box>
  );
}
