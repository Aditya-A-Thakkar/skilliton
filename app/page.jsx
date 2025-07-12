'use client';

import React, { useState, useEffect } from 'react';
import AppTheme from '@/components/shared-theme/AppTheme';
import {
  Box,
  Typography,
  TextField,
  Container,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const skillsList = [
  'Frontend',
  'Backend',
  'React',
  'Node.js',
  'UI/UX',
  'DevOps',
  'Machine Learning',
  'Data Science',
  'Cloud',
  'Security',
  'Marketing',
  'Design',
  'Python',
  'JavaScript',
  'C++',
  'Rust',
];

const skillDescriptions = {
  'Frontend': 'Build responsive and interactive user interfaces.',
  'Backend': 'Manage server-side logic and databases.',
  'React': 'Create modern web apps using React library.',
  'Node.js': 'Build scalable backend APIs with Node.js.',
  'UI/UX': 'Design intuitive and user-friendly experiences.',
  'DevOps': 'Automate deployments and monitor infrastructure.',
  'Machine Learning': 'Create models that learn from data.',
  'Data Science': 'Analyze and visualize complex data.',
  'Cloud': 'Deploy applications on cloud platforms.',
  'Security': 'Protect apps and data from threats.',
  'Marketing': 'Grow your audience and drive engagement.',
  'Design': 'Craft stunning visuals and branding.',
  'Python': 'Versatile programming for all domains.',
  'JavaScript': 'Power the web with dynamic behavior.',
  'C++': 'High-performance programming for systems.',
  'Rust': 'Reliable and fast systems programming.',
};

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [adminMessages, setAdminMessages] = useState([]);

  useEffect(() => {
    fetch('/api/user/messages')
      .then((res) => res.json())
      .then(setAdminMessages)
      .catch(console.error);
  }, []);

  const filteredSkills = skillsList
    .filter(skill =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b))
    .slice(0, 4);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <AppTheme>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '70vh',
          width: '100%',
          overflow: 'hidden',
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Background Layer A */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/imageA.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />
        {/* Spotlight Layer B */}
        <Box
          sx={() => {
            const radius = 120;
            const { x, y } = mousePos;
            const gradient = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)`;

            return {
              position: 'absolute',
              inset: 0,
              backgroundImage: "url('/imageB.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 2,
              pointerEvents: 'none',
              maskImage: gradient,
              WebkitMaskImage: gradient,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              transition: 'mask-image 0.1s ease, -webkit-mask-image 0.1s ease',
            };
          }}
        />

        {/* Foreground Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            px: { xs: 3, md: 10 },
            color: 'white',
          }}
        >
          <Box sx={{ maxWidth: 700, width: '100%' }}>
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mt: 14, mb: 2, ml: '50px' }}
            >
              Welcome to Skilliton
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, mb: 4, ml: '50px' }}
            >
              Connect to people around the globe with skills you want
            </Typography>

            {/* Search Input + Dropdown */}
            <Box sx={{ position: 'relative', width: '850px', ml: '50px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 2,
                  backgroundColor: 'white',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <TextField
                  placeholder="Search skills you want"
                  variant="outlined"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  sx={{
                    backgroundColor: 'white',
                    border: 'none',
                    '& fieldset': { border: 'none' },
                    input: {
                      padding: '20px 16px',
                      fontSize: '1.1rem',
                    },
                  }}
                />
                <IconButton
                  sx={{
                    backgroundColor: '#a450b0',
                    color: 'white',
                    borderRadius: 0,
                    px: 2,
                    '&:hover': {
                      backgroundColor: '#a450b0',
                    },
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>

              {/* Dropdown */}
              {showDropdown && (
                <Paper
                  elevation={4}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 1,
                    zIndex: 10,
                    borderRadius: 2,
                    backgroundColor: 'white',
                  }}
                >
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill, idx) => (
                      <ListItem
                        key={idx}
                        button
                        sx={{
                          px: 2,
                          py: 1.2,
                          borderRadius: 1.5,
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            backgroundColor: '#ede7f6',
                            borderRadius: 1.5,
                          },
                        }}
                      >
                        <ListItemText
                          primary={skill}
                          primaryTypographyProps={{
                            fontSize: '1.3rem',
                            color: '#6a1b9a',
                          }}
                        />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText
                        primary="No skills found"
                        primaryTypographyProps={{
                          fontSize: '1rem',
                          color: '#999',
                          fontStyle: 'italic',
                        }}
                      />
                    </ListItem>
                  )}
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h1" fontWeight="bold" gutterBottom>
          Explore Services and Talents
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '25px' }}>
          Discover thousands of freelancers ready to help you with anything —
          from web development and design to writing, editing, and beyond.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {skillsList.map((skill, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  background: '#f3e5f5',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: '#6a1b9a', mb: 1 }}
                  >
                    {skill}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {skillDescriptions[skill]}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Admin Inbox */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>Messages from Admin</Typography>
        {adminMessages.length > 0 ? (
          <List>
            {adminMessages.map((msg, i) => (
              <ListItem key={i} sx={{ bgcolor: '#f3e5f5', borderRadius: 2, mb: 2 }}>
                <ListItemText
                  primary={msg.subject || 'Announcement'}
                  secondary={msg.body || msg.content}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No messages yet</Typography>
        )}
      </Container>
    </AppTheme>
  );
}
