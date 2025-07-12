'use client';

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';

import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });


export default function PrimarySearchAppBar() {
  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(to right, #0a0a0a, #6a1b9a)', 
          color: 'white',
        }}
      >
        <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a" // make it an anchor
              href="/"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontWeight: 'bold',
                fontSize: '1.6rem',
                ml: '100px',
                cursor: 'pointer',  
                color: 'inherit', 
              }}
            >
              skillItOn
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* Right-side icons + About Us link */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* About Us Link */}
              <Typography
                component="a"
                href="/match-people"
                sx={{
                  ml: 2,
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'medium',
                  fontSize: '1.2rem', // increased size
                  transition: 'all 0.2s ease-in-out',
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': {
                    color: '#9c27b0', // green hover color
                    transform: 'scale(1.02)',
                    textDecoration: 'none',
                  },
                }}
              >
                Match
              </Typography>
              <Typography
                component="a"
                href="/swap-people"
                sx={{
                  ml: 2,
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'medium',
                  fontSize: '1.2rem', // increased size
                  transition: 'all 0.2s ease-in-out',
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': {
                    color: '#9c27b0', // green hover color
                    transform: 'scale(1.02)',
                    textDecoration: 'none',
                  },
                }}
              >
                Swap
              </Typography>
              <Typography
                component="a"
                href="/swap-history"
                sx={{
                  ml: 2,
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'medium',
                  fontSize: '1.2rem', // increased size
                  transition: 'all 0.2s ease-in-out',
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': {
                    color: '#9c27b0', // green hover color
                    transform: 'scale(1.02)',
                    textDecoration: 'none',
                  },
                }}
              >
                History
              </Typography>
              <Typography
                component="a"
                href="/about-us"
                sx={{
                  ml: 2,
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'medium',
                  fontSize: '1.2rem', // increased size
                  transition: 'all 0.2s ease-in-out',
                  fontFamily: '"Poppins", sans-serif',
                  '&:hover': {
                    color: '#9c27b0',// green hover color
                    transform: 'scale(1.02)',
                    textDecoration: 'none',
                  },
                }}
              >
                About Us
              </Typography>


              <IconButton
                size="large"
                edge="end"
                aria-label="Go to profile"
                component="a"
                href="/profile"
                color="inherit"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: '#9c27b0',
                    transform: 'scale(1.04)',
                  },
                }}
              >
                <AccountCircle />
              </IconButton>

            </Box>
          </Toolbar>

      </AppBar>
    </Box>
  );
}