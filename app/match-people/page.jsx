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
      { id: 2, type: 'OFFER', skill: { name: 'Marketing' } },
      { id: 3, type: 'WANT', skill: { name: 'React' } },
      { id: 4, type: 'WANT', skill: { name: 'Backend' } },
      { id: 5, type: 'WANT', skill: { name: 'Backend' } },
    ],
  },
  {
    id: 2,
    name: 'Shankhadeep Ghosh',
    location: 'Kolkata',
    profilePhoto: null,
    skills: [
      { id: 6, type: 'OFFER', skill: { name: 'Marketing' } },
      { id: 7, type: 'OFFER', skill: { name: 'UI/UX' } },
      { id: 8, type: 'OFFER', skill: { name: 'Marketing' } },
      { id: 9, type: 'WANT', skill: { name: 'React' } },
      { id: 10, type: 'WANT', skill: { name: 'Backend' } },
    ],
  },
  {
    id: 3,
    name: 'Aditya Thakkar',
    location: 'Mumbai',
    profilePhoto: null,
    skills: [
      { id: 11, type: 'OFFER', skill: { name: 'Marketing' } },
      { id: 12, type: 'OFFER', skill: { name: 'UI/UX' } },
      { id: 13, type: 'WANT', skill: { name: 'React' } },
      { id: 14, type: 'WANT', skill: { name: 'Backend' } },
      { id: 15, type: 'WANT', skill: { name: 'React' } },
    ],
  },
  {
    id: 4,
    name: 'Aditey',
    location: 'Bangalore',
    profilePhoto: null,
    skills: [
      { id: 16, type: 'OFFER', skill: { name: 'React' } },
      { id: 17, type: 'OFFER', skill: { name: 'Backend' } },
      { id: 18, type: 'WANT', skill: { name: 'Marketing' } },
      { id: 19, type: 'WANT', skill: { name: 'UI/UX' } },
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

  const currentOffer = currentUser.skills
    .filter((s) => s.type === 'OFFER')
    .map((s) => s.skill.name.trim());
  const currentWant = currentUser.skills
    .filter((s) => s.type === 'WANT')
    .map((s) => s.skill.name.trim());

  const filtered = users.filter((user) => {
    const offers = user.skills
      .filter((s) => s.type === 'OFFER')
      .map((s) => s.skill.name.trim());
    const wants = user.skills
      .filter((s) => s.type === 'WANT')
      .map((s) => s.skill.name.trim());

    const matchOffer = currentWant.some((skill) => offers.includes(skill));
    const matchWant = currentOffer.some((skill) => wants.includes(skill));

    return matchOffer && matchWant;
  });

  return (
    <Box p={5}>
      <Typography variant="h4" mb={4} fontSize="2rem" textAlign="center">
        Matches for Aditey
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {filtered.map((user) => (
          <Card key={user.id} sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={3} alignItems="center">
                {user.profilePhoto ? (
                  <Image
                    src={user.profilePhoto}
                    alt={user.name}
                    width={100}
                    height={100}
                    style={{ borderRadius: '12px' }}
                  />
                ) : (
                  <Box
                    width={100}
                    height={100}
                    bgcolor="grey.300"
                    borderRadius="12px"
                  />
                )}
                <Box>
                  <Typography variant="h6" fontSize="1.3rem">
                    {user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {user.location || 'Location not provided'}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography
                  fontSize="1.1rem"
                  fontWeight={600}
                  color="black"
                  mb={1}
                >
                  Skills offering:
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={2}>
                  {user.skills
                    .filter((s) => s.type === 'OFFER')
                    .map((s) => (
                      <Chip
                        key={s.id}
                        label={s.skill.name}
                        sx={{
                          bgcolor: '#f3e5f5',
                          color: '#6a1b9a',
                          fontSize: '0.95rem',
                          px: 1.5,
                          py: 0.75,
                        }}
                      />
                    ))}
                </Stack>

                <Typography
                  fontSize="1.1rem"
                  fontWeight={600}
                  color="black"
                  mb={1}
                >
                  Skills wanted:
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  {user.skills
                    .filter((s) => s.type === 'WANT')
                    .map((s) => (
                      <Chip
                        key={s.id}
                        label={s.skill.name}
                        sx={{
                          bgcolor: '#e1bee7',
                          color: '#4a148c',
                          fontSize: '0.95rem',
                          px: 1.5,
                          py: 0.75,
                        }}
                      />
                    ))}
                </Stack>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#6a1b9a', fontSize: '1rem', py: 1 }}
              >
                Request Swap
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MatchesPage;
