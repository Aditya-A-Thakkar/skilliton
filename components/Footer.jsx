'use client';

import React from 'react';
import { Box, Container, Typography, Link, Grid, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        backgroundColor: '#0d0d0d',
        color: '#fff',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand & Tagline */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}
            >
              SkillItOn
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', lineHeight: 1.6 }}>
              Empowering people to learn and grow through skill swaps. Join a
              community where everyone helps each other.
            </Typography>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1, color: 'white' }}
            >
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Email:{' '}
              <Link
                href="mailto:shankhadeepg444@gmail.com"
                color="inherit"
                underline="hover"
              >
                shankhadeepg444@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray' }}>
              Phone: +91 91431 20311
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 1, color: 'white' }}
            >
              Quick Links
            </Typography>
            <Stack spacing={0.5}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about-us" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/contact-us" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Box mt={5} textAlign="center">
          <Typography variant="body2" sx={{ fontSize: '0.9rem', color: 'gray' }}>
            &copy; {new Date().getFullYear()} SkillItOn. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
