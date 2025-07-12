'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Stack,
} from '@mui/material';

const team = [
  { name: 'Aditey Nandan', initials: 'AN' },
  { name: 'Aditya Thakkar', initials: 'AT' },
  { name: 'Shankhadeep Ghosh', initials: 'SG' },
  { name: 'Hasini G', initials: 'HG' },
];

const AboutUsPage = () => {
  return (
    <Box p={5}>
      <Typography variant="h4" align="center" mb={3}>
        About Us
      </Typography>

      <Typography variant="body1" align="center" maxWidth={800} mx="auto" mb={4}>
        Skilliton is a collaborative platform designed to help people grow by trading skills directly.
        Whether you're a developer eager to learn marketing, or a designer curious about backend
        systems, Skilliton helps you connect with people who have what you want and want what you
        have. It’s a flexible, peer-powered ecosystem that makes work social, mutual, and accesible.
      </Typography>

      <Typography variant="h5" align="center" mt={6} mb={3}>
        Meet the Team
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {team.map((member) => (
          <Grid item key={member.name} xs={12} sm={6} md={3}>
            <Card elevation={3}>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#6a1b9a', width: 80, height: 80, fontSize: 32 }}>
                    {member.initials}
                  </Avatar>
                  <Typography variant="h6" align="center">
                    {member.name}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutUsPage;
