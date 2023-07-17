import { Box, Container, Grid, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import React from 'react';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: blue[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography fontWeight="bold" textAlign="center">
              ĐẤT VÀ NGƯỜI BÀ RỊA - VŨNG TÀU
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" fontWeight={500}>
              Địa chỉ:
            </Typography>
            <Typography variant="body2">
              Địa chỉ Trường THCS Châu Thành 58 Trần Hưng Đạo Phường 1 TP Vũng
              Tàu
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={500}>Liên hệ:</Typography>
            <Typography variant="body2">Điện thoại: 0941865859</Typography>
            <Typography variant="body2">
              Email: nhungngovt88@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
