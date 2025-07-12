'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
  Button,
} from '@mui/material';

const dummyRequests = {
  sent: [
    {
      id: 1,
      name: 'Hasini G',
      location: 'Chennai',
      profilePhoto: null,
      offering: 'React',
      requesting: 'UI/UX',
    },
    {
      id: 2,
      name: 'Shankhadeep Ghosh',
      location: 'Kolkata',
      profilePhoto: null,
      offering: 'Backend',
      requesting: 'Marketing',
    },
  ],
  received: [
    {
      id: 3,
      name: 'Aditya Thakkar',
      location: 'Mumbai',
      profilePhoto: null,
      offering: 'UI/UX',
      requesting: 'Backend',
    },
    {
      id: 4,
      name: 'Hasini G',
      location: 'Chennai',
      profilePhoto: null,
      offering: 'Marketing',
      requesting: 'React',
    },
  ],
};

const SwapRequestsPage = () => {
  const [activeTab, setActiveTab] = useState('sent');
  const activeRequests = dummyRequests[activeTab];

  return (
    <Box p={5}>
      <Typography variant="h4" mb={4}>
        Swap Requests
      </Typography>

      {/* Centered Tabs */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {['sent', 'received'].map((tab) => (
          <Box
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              px: 3,
              pb: 2,
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              fontSize: '1.2rem',
              borderBottom: activeTab === tab ? '2px solid rgba(0,0,0,0.44)' : 'none',
              transition: 'color 0.3s, border-color 0.3s',
              mx: 2,
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Box>
        ))}
      </Box>

      {/* Card Grid */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
      >
        {activeRequests.map((req) => (
          <Grid item key={req.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                minWidth: 280,
              }}
            >
              <Stack spacing={2}>
                {/* Header with Image */}
                <Stack direction="row" spacing={2} alignItems="center">
                  {req.profilePhoto ? (
                    <img
                      src={req.profilePhoto}
                      alt={req.name}
                      width={80}
                      height={80}
                      style={{ borderRadius: '12px' }}
                    />
                  ) : (
                    <Box
                      width={80}
                      height={80}
                      bgcolor="grey.300"
                      borderRadius="12px"
                    />
                  )}
                  <Box>
                    <Typography variant="h6">{req.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {req.location || 'Location not provided'}
                    </Typography>
                  </Box>
                </Stack>

                {/* Offer/Request Info */}
                <Box>
                  <Typography fontSize="1rem" fontWeight={600} mb={0.5}>
                    You Offer:
                  </Typography>
                  <Chip
                    label={req.offering}
                    sx={{
                      bgcolor: '#f3e5f5',
                      color: '#6a1b9a',
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontSize="1rem" fontWeight={600} mb={0.5}>
                    You Receive:
                  </Typography>
                  <Chip
                    label={req.requesting}
                    sx={{
                      bgcolor: '#e1bee7',
                      color: '#4a148c',
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>

                {/* Button */}
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1 }}
                >
                  {activeTab === 'sent' ? 'Cancel Request' : 'Respond'}
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SwapRequestsPage;
