'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Card,
  Typography,
  Chip,
  Button,
  Stack,
} from '@mui/material';

const dummyUsers = [
  {
    id: 1,
    name: 'Hasini G',
    location: 'Chennai',
    profilePhoto: null,
    skills: [
      { id: 1, type: 'OFFER', skill: { name: 'UI/UX' } },
      { id: 2, type: 'WANT', skill: { name: 'Backend' } },
    ],
  },
  {
    id: 2,
    name: 'Shankhadeep Ghosh',
    location: 'Kolkata',
    profilePhoto: null,
    skills: [
      { id: 3, type: 'OFFER', skill: { name: 'React' } },
      { id: 4, type: 'WANT', skill: { name: 'Marketing' } },
    ],
  },
  {
    id: 3,
    name: 'Aditya Thakkar',
    location: null,
    profilePhoto: null,
    skills: [
      { id: 5, type: 'OFFER', skill: { name: 'Backend' } },
      { id: 6, type: 'WANT', skill: { name: 'UI/UX' } },
    ],
  },
  {
    id: 4,
    name: 'Aditey',
    location: 'Bangalore',
    profilePhoto: null,
    skills: [
      { id: 7, type: 'OFFER', skill: { name: 'React' } },
      { id: 8, type: 'OFFER', skill: { name: 'Backend' } },
      { id: 9, type: 'WANT', skill: { name: 'Marketing' } },
      { id: 10, type: 'WANT', skill: { name: 'UI/UX' } },
    ],
  },
];

const MatchesPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const current = dummyUsers.find((u) => u.name === 'Aditey');
    const others = dummyUsers.filter((u) => u.name !== 'Aditey');
    setCurrentUser(current);
    setUsers(others);
  }, []);

  if (!currentUser) return null;

  const currentOffer = currentUser.skills.filter(s => s.type === 'OFFER').map(s => s.skill.name.trim());
  const currentWant = currentUser.skills.filter(s => s.type === 'WANT').map(s => s.skill.name.trim());

  const filtered = users.filter((user) => {
    const offers = user.skills.filter(s => s.type === 'OFFER').map(s => s.skill.name.trim());
    const wants = user.skills.filter(s => s.type === 'WANT').map(s => s.skill.name.trim());

    const matchOffer = currentWant.some(skill => offers.includes(skill));
    const matchWant = currentOffer.some(skill => wants.includes(skill));

    return matchOffer && matchWant;
  });

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Matches for Aditey</Typography>

      <Stack spacing={3}>
        {filtered.map((user) => (
          <Card key={user.id} sx={{ p: 3 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              {user.profilePhoto ? (
                <Image
                  src={user.profilePhoto}
                  alt={user.name}
                  width={90}
                  height={90}
                  style={{ borderRadius: '12px' }}
                />
              ) : (
                <Box
                  width={90}
                  height={90}
                  bgcolor="grey.300"
                  borderRadius="12px"
                />
              )}

              <Box flexGrow={1}>
                <Typography variant="h6">{user.name}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {user.location || 'Location not provided'}
                </Typography>

                <Typography variant="subtitle2" color="purple" mb={0.5}>Skills offering:</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
                  {user.skills.filter(s => s.type === 'OFFER').map(s => (
                    <Chip key={s.id} label={s.skill.name} sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                  ))}
                </Stack>

                <Typography variant="subtitle2" color="purple" mb={0.5}>Skills wanted:</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {user.skills.filter(s => s.type === 'WANT').map(s => (
                    <Chip key={s.id} label={s.skill.name} sx={{ bgcolor: '#e1bee7', color: '#4a148c' }} />
                  ))}
                </Stack>
              </Box>

              <Box ml="auto">
                <Button variant="contained" sx={{ bgcolor: '#6a1b9a' }}>
                  Request Swap
                </Button>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default MatchesPage;
