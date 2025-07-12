'use client';

import React from 'react';
import AppTheme from '@/components/shared-theme/AppTheme';
import { Box, Typography, TextField, Container, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function HomePage() {
  return (
    <AppTheme>
    <Box
      sx={{
        minHeight: '70vh',
        background: 'linear-gradient(to right, #0b2f0b, #1e6726)', // more green
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 3, md: 10 },
      }}
    >
      <Box sx={{ maxWidth: 700, width: '100%' }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 2, ml: '50px', }}
        >
          Welcome to Skilliton
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, mb: 4, ml: '50px' }}
        >
          Connect to people around the globe with skills you want
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            ml: '50px',
            width: '850px',
            mt: 2,
            backgroundColor: 'white',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <TextField
            placeholder="Search skills you want"
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: 'white',
              border: 'none',
              '& fieldset': { border: 'none' },
              input: {
                padding: '20px 16px',
                fontSize: '1.1rem',
              },
            }}
          />
          <IconButton
            sx={{
              backgroundColor: '#1e6726',
              color: 'white',
              borderRadius: 0,
              px: 2,
              '&:hover': {
                backgroundColor: '#155d1d',
              },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>

    {/* Content Section */}
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" fontWeight="medium" gutterBottom>
        Explore Services and Talents
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Discover thousands of freelancers ready to help you with anything —
        from web development and design to writing, editing, and beyond.
      </Typography>
    </Container>
  </AppTheme>
  );
}
