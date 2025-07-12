'use client';

import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        backgroundColor: 'black',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Community / Join Us */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Join Our Community
            </Typography>
            <Typography variant="body2" sx={{ color: '#ccc' }}>
              Whether you're here to learn or to teach, Skilliton is your space
              to grow, collaborate, and connect with like-minded people across the globe.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/about-us" color="inherit" underline="hover">About Us</Link>
              <Link href="/contact-us" color="inherit" underline="hover">Contact Us</Link>
              <Link href="/faq" color="inherit" underline="hover">FAQs</Link>
              <Link href="/terms" color="inherit" underline="hover">Terms & Conditions</Link>
            </Box>
          </Grid>

          {/* Contact Us + Socials */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email:{' '}
              <Link href="mailto:shankhadeepg444@gmail.com" color="inherit" underline="hover">
                shankhadeepg444@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              Phone:{' '}
              <Link href="tel:+919999999999" color="inherit" underline="hover">
                +91 99999 99999
              </Link>
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Connect with us:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton href="https://facebook.com" color="inherit" size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://instagram.com" color="inherit" size="small">
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://github.com" color="inherit" size="small">
                  <GitHubIcon />
                </IconButton>
                <IconButton href="https://linkedin.com" color="inherit" size="small">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#444' }} />

        <Typography variant="body2" align="center" sx={{ color: 'gray' }}>
          &copy; {new Date().getFullYear()} Skilliton. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
