'use client';

import React, { useState } from 'react';
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

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/imageB.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 2,
            pointerEvents: 'none',
            clipPath: `circle(150px at ${mousePos.x}px ${mousePos.y}px)`,
            transition: 'clip-path 0.1s ease',
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
        <Typography variant="h4" fontWeight="medium" gutterBottom>
          Explore Services and Talents
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover thousands of freelancers ready to help you with anything —
          from web development and design to writing, editing, and beyond.
        </Typography>
      </Container>
    </AppTheme>
  );
}
