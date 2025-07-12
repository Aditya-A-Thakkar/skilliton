'use client';

import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" spacing={2}>
          <Grid item sx={{ mt: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                mt: 0.5,
              }}
            >
              <Link
                href="mailto:shankhadeepg444@gmail.com"
                color="inherit"
                underline="hover"
              >
                shankhadeepg444@gmail.com
              </Link>
            </Typography>
          </Grid>

          <Grid item sx={{ mt: 3 }}>
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: '0.95rem', color: 'gray' }}
            >
              &copy; {new Date().getFullYear()} skillItOn. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
