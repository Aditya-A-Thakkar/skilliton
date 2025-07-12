'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function AboutUsPage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        SkillItOn is a platform that connects people with skills to those who need them.
        Whether you’re looking to offer your expertise or find someone to help with your goals,
        SkillItOn makes it easy, global, and seamless.
      </Typography>
    </Container>
  );
}
