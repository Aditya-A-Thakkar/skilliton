'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Rating,
} from '@mui/material';

const dummySwaps = [
  {
    id: 1,
    partner: 'Hasini G',
    location: 'Chennai',
    offering: 'React',
    receiving: 'UI/UX',
    startDate: '2024-07-01',
    endDate: null,
    rating: null,
  },
  {
    id: 2,
    partner: 'Shankhadeep Ghosh',
    location: 'Kolkata',
    offering: 'Backend',
    receiving: 'Marketing',
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    rating: 4,
  },
  {
    id: 3,
    partner: 'Aditya Thakkar',
    location: 'Mumbai',
    offering: 'React',
    receiving: 'UI/UX',
    startDate: '2024-06-10',
    endDate: '2024-07-01',
    rating: null,
  },
];

const SwapHistoryPage = () => {
  const [swaps, setSwaps] = useState(dummySwaps);

  const handleCloseSwap = (id) => {
    setSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, endDate: new Date().toISOString().split('T')[0] } : swap
      )
    );
  };

  const handleRate = (id, newValue) => {
    setSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, rating: newValue } : swap
      )
    );
  };

  const ongoing = swaps.filter((s) => !s.endDate);
  const completed = swaps.filter((s) => s.endDate);

  return (
    <Box p={5}>
      <Typography variant="h4" mb={4} textAlign="center">
        My Swaps
      </Typography>

      <Stack spacing={6}>
        {[{ title: 'Ongoing Swaps', data: ongoing }, { title: 'Completed Swaps', data: completed }].map(
          (section) =>
            section.data.length > 0 && (
              <Box key={section.title}>
                <Typography variant="h5" mb={3}>
                  {section.title}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                  }}
                >
                  {section.data.map((swap) => (
                    <Box
                      key={swap.id}
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 3,
                        width: {
                          xs: '100%',
                          sm: '48%',
                        },
                        boxSizing: 'border-box',
                      }}
                    >
                      <Typography variant="h6" mb={0.5}>
                        {swap.partner}
                      </Typography>
                      <Typography color="text.secondary" mb={2}>
                        {swap.location}
                      </Typography>

                      <Stack direction="row" spacing={2} mb={2}>
                        <Box>
                          <Typography fontWeight={600} fontSize="1rem" mb={0.5}>
                            You Offered
                          </Typography>
                          <Chip label={swap.offering} sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                        </Box>
                        <Box>
                          <Typography fontWeight={600} fontSize="1rem" mb={0.5}>
                            You Received
                          </Typography>
                          <Chip label={swap.receiving} sx={{ bgcolor: '#e1bee7', color: '#4a148c' }} />
                        </Box>
                      </Stack>

                      <Typography fontSize="0.95rem" mb={2}>
                        <strong>{swap.startDate}</strong> &nbsp;—&nbsp;
                        <strong>{swap.endDate || 'Present'}</strong>
                      </Typography>

                      {section.title === 'Ongoing Swaps' ? (
                        <Button
                          variant="contained"
                          onClick={() => handleCloseSwap(swap.id)}
                          sx={{ bgcolor: '#6a1b9a', width: 'fit-content' }}
                        >
                          Mark as Completed
                        </Button>
                      ) : (
                        <Box>
                          <Typography fontWeight={600} mb={0.5}>
                            Your Rating
                          </Typography>
                          <Rating
                            value={swap.rating}
                            onChange={
                              swap.rating == null
                                ? (_, value) => handleRate(swap.id, value)
                                : null
                            }
                            readOnly={swap.rating != null}
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )
        )}
      </Stack>
    </Box>
  );
};

export default SwapHistoryPage;
