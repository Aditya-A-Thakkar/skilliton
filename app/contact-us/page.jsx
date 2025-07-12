'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  MenuItem,
} from '@mui/material';

const ContactUsPage = () => {
  const [issueType, setIssueType] = useState('');
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('issueType', issueType);
    formData.append('severity', severity);
    formData.append('description', description);
    if (file) formData.append('screenshot', file);

    console.log('Form submitted:', {
      issueType,
      severity,
      description,
      file,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setIssueType('');
    setSeverity('');
    setDescription('');
    setFile(null);
  };

  return (
    <Box maxWidth={600} mx="auto" p={5}>
      <Typography variant="h4" mb={3} align="center">
        Contact Us
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="What is the issue about?"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        >
          {[
            'Bug Report',
            'General Feedback',
            'Feature Request',
            'Reporting a User',
            'Other',
          ].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="How severe is the issue?"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        >
          {[
            'Critical – I can’t use the app',
            'Moderate – It affects my experience',
            'Minor – Just reporting it',
            'Suggestion – Just an idea',
          ].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Describe your issue"
          multiline
          rows={4}
          fullWidth
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box mb={4}>
          <Typography fontWeight={600} mb={1}>
            Optional: Attach a screenshot
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Box>

        <Button
          variant="contained"
          type="submit"
          sx={{ bgcolor: '#6a1b9a' }}
          fullWidth
        >
          Submit
        </Button>
      </form>

      {submitted && (
        <Alert severity="success" sx={{ mt: 4 }}>
          Thank you! We are working on it.
        </Alert>
      )}
    </Box>
  );
};

export default ContactUsPage;
