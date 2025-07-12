'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  LinearProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Function to assess how strong the new password is
const getPasswordStrength = (password) => {
  if (password.length === 0) return { label: '', score: 0 };
  if (password.length < 6) return { label: 'Weak', score: 30 };
  if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return { label: 'Medium', score: 60 };
  }
  return { label: 'Strong', score: 100 };
};

const ChangePasswordPage = () => {
  // Form state to hold all password fields
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // State to toggle show/hide for each password field
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // State for error/success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Calculate the strength of the new password
  const { label: strengthLabel, score: strengthScore } = getPasswordStrength(form.newPassword);

  // Handle input changes and reset feedback messages
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  // Form submission handler
  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmNewPassword } = form;

    // Make sure all fields are filled
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    // Check if new passwords match
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Ensure password is strong enough
    if (strengthScore < 60) {
      setError('Please choose a stronger password.');
      return;
    }

    // Placeholder for password update API call
    console.log('Password changed:', form);
    setSuccess('Password updated successfully!');
    setForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  return (
    <Box p={5} maxWidth={500} mx="auto">
      <Typography variant="h4" mb={4} align="center">
        Change Password
      </Typography>

      <Stack spacing={3}>
        {/* Current Password Field */}
        <TextField
          label="Current Password"
          type={showPassword.current ? 'text' : 'password'}
          value={form.currentPassword}
          onChange={(e) => handleChange('currentPassword', e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, current: !prev.current }))
                  }
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* New Password Field + Strength Indicator */}
        <Box>
          <TextField
            label="New Password"
            type={showPassword.new ? 'text' : 'password'}
            value={form.newPassword}
            onChange={(e) => handleChange('newPassword', e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                    }
                  >
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Display password strength bar and label */}
          {strengthLabel && (
            <Box mt={1}>
              <Typography
                fontSize="0.9rem"
                color={
                  strengthScore === 100
                    ? 'green'
                    : strengthScore >= 60
                    ? 'orange'
                    : 'red'
                }
                mb={0.5}
              >
                Strength: {strengthLabel}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={strengthScore}
                sx={{
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor:
                      strengthScore === 100
                        ? '#4caf50'
                        : strengthScore >= 60
                        ? '#ffa726'
                        : '#f44336',
                  },
                }}
              />
            </Box>
          )}
        </Box>

        {/* Confirm New Password Field */}
        <TextField
          label="Confirm New Password"
          type={showPassword.confirm ? 'text' : 'password'}
          value={form.confirmNewPassword}
          onChange={(e) => handleChange('confirmNewPassword', e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))
                  }
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Show error/success feedback */}
        {error && (
          <Typography color="error" fontSize="0.95rem">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" fontSize="0.95rem">
            {success}
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#6a1b9a', py: 1, fontSize: '1rem' }}
        >
          Update Password
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordPage;
