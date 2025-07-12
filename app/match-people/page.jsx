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

// Dummy list of users including the current user (Aditey) and others
const dummyUsers = [
  // Each user has a name, location, optional profile photo, and list of skills with OFFER or WANT type
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
    name: 'Aditey', // current user
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
  const [users, setUsers] = useState([]); // All other users
  const [currentUser, setCurrentUser] = useState(null); // Logged-in user (Aditey)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    async function fetchMatches() {
      const [meRes, matchesRes] = await Promise.all([
        fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("/api/matches", {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);

      const current = await meRes.json();
      const matches = await matchesRes.json();

      setCurrentUser(current);
      setUsers(matches);
    }

    fetchMatches().catch(console.error);

  }, []);
  useEffect(() => {
    console.log("Current user:", currentUser);
    console.log("Matched users:", users);
    if (currentUser !== null) {
      console.log("Offers:", currentUser.skills.filter(s => s.type === "OFFER").map(s => s.skill.name));
      console.log("Wants:", currentUser.skills.filter(s => s.type === "WANT").map(s => s.skill.name));
    }
  }, [currentUser, users]);

  // Don't render anything until current user is initialized
  if (!currentUser) return null;

  // Extract skills Aditey is offering and wants
  const currentOffer = currentUser.skills
    .filter((s) => s.type === 'OFFER')
    .map((s) => s.skill.name.trim());

  const currentWant = currentUser.skills
    .filter((s) => s.type === 'WANT')
    .map((s) => s.skill.name.trim());

  // Filter users who have at least one skill Aditey wants AND want at least one skill Aditey offers
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

  const handleSwapRequest = async (toUserId, offerSkillName, wantSkillName) => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/swap-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ toUserId, offerSkillName, wantSkillName }),
    });

    if (res.ok) {
      alert("Swap request sent!");
    } else {
      alert("Failed to send swap request");
    }
  };


  return (
    <Box p={5}>
      {/* Title */}
      <Typography variant="h4" mb={4} fontSize="2rem" textAlign="center">
        Matches for {currentUser?.name || "you"}
      </Typography>

      {/* Grid layout to show user match cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr', // max 3 cards in a row
          },
          gap: 4,
          justifyContent: 'center',
        }}
      >
        {filtered.map((user) => (
          <Card key={user.id} sx={{ p: 4 }}>
            <Stack spacing={3}>
              {/* User profile section */}
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

              {/* Skills offering section */}
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

                {/* Skills wanted section */}
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
                  onClick={() => {
                    // 🔄 Pick 1 matching offer/want pair
                    const theirOffers = user.skills.filter(s => s.type === 'OFFER');
                    const theirWants = user.skills.filter(s => s.type === 'WANT');
                    const myOffers = currentUser.skills.filter(s => s.type === 'OFFER');
                    const myWants = currentUser.skills.filter(s => s.type === 'WANT');

                    const offerSkill = theirOffers.find(theirSkill =>
                        myWants.some(myWant => myWant.skill.name === theirSkill.skill.name)
                    );
                    const wantSkill = theirWants.find(theirWant =>
                        myOffers.some(myOffer => myOffer.skill.name === theirWant.skill.name)
                    );

                    if (offerSkill && wantSkill) {
                      handleSwapRequest(user.id, offerSkill.skill.name, wantSkill.skill.name);
                    } else {
                      alert("No compatible skill match found");
                    }
                  }}
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
