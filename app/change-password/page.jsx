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

const getPasswordStrength = (password) => {
  if (password.length === 0) return { label: '', score: 0 };
  if (password.length < 6) return { label: 'Weak', score: 30 };
  if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return { label: 'Medium', score: 60 };
  }
  return { label: 'Strong', score: 100 };
};

const ChangePasswordPage = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { label: strengthLabel, score: strengthScore } = getPasswordStrength(form.newPassword);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = () => {
    const { currentPassword, newPassword, confirmNewPassword } = form;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (strengthScore < 60) {
      setError('Please choose a stronger password.');
      return;
    }

    // TODO: Call API
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
