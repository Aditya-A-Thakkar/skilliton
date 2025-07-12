'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Chip,
  Button,
  Rating,
} from '@mui/material';

const SwapHistoryPage = () => {
  const [swaps, setSwaps] = useState([]);

  // Fetch swap history from API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/swaps', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSwaps(data))
      .catch(console.error);
  }, []);

  const handleCloseSwap = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const today = new Date().toISOString().split('T')[0];
    await fetch(`/api/swaps/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endDate: today }),
    });

    setSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, endDate: today } : swap
      )
    );
  };

  const handleRate = async (id, newRating) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    await fetch(`/api/swaps/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: newRating }),
    });

    setSwaps((prev) =>
      prev.map((swap) =>
        swap.id === id ? { ...swap, rating: newRating } : swap
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

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {section.data.map((swap) => (
                    <Box
                      key={swap.id}
                      sx={{
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 3,
                        width: { xs: '100%', sm: '48%' },
                        boxSizing: 'border-box',
                      }}
                    >
                      <Typography variant="h6" mb={0.5}>
                        {swap.partnerName}
                      </Typography>
                      <Typography color="text.secondary" mb={2}>
                        {swap.partnerLocation}
                      </Typography>

                      <Stack direction="row" spacing={2} mb={2}>
                        <Box>
                          <Typography fontWeight={600} fontSize="1rem" mb={0.5}>
                            You Offered
                          </Typography>
                          <Chip label={swap.offerSkillName} sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                        </Box>
                        <Box>
                          <Typography fontWeight={600} fontSize="1rem" mb={0.5}>
                            You Received
                          </Typography>
                          <Chip label={swap.wantSkillName} sx={{ bgcolor: '#e1bee7', color: '#4a148c' }} />
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
