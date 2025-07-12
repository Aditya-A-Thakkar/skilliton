'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  Chip,
  Avatar,
  Autocomplete,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const allSkills = ['React', 'Backend', 'UI/UX', 'Marketing', 'ML', 'Node.js'];

const initialUser = {
  name: 'Aditey',
  location: 'Bangalore',
  email: 'aditey@example.com',
  profilePhoto: null,
  offerSkills: ['React', 'Backend'],
  wantSkills: ['UI/UX', 'Marketing'],
};

const ProfilePage = () => {
  const [user, setUser] = useState(initialUser);
  const [editable, setEditable] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const router = useRouter();

  const handleFieldChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saved user:', user);
    setEditable(false);
  };

  const confirmDelete = () => {
    console.log('Deleting account with password:', deletePassword);
    setShowDeleteDialog(false);
    setDeletePassword('');
    // Handle actual deletion here
  };

  return (
    <Box p={5} maxWidth={700} mx="auto">
      <Typography variant="h4" mb={4} align="center">
        My Profile
      </Typography>

      <Stack spacing={4}>
        {/* Avatar and Basic Info */}
        <Stack direction="row" spacing={3} alignItems="center">
          {user.profilePhoto ? (
            <Avatar src={user.profilePhoto} sx={{ width: 90, height: 90 }} />
          ) : (
            <Avatar sx={{ width: 90, height: 90, bgcolor: 'grey.400' }}>
              {user.name[0]}
            </Avatar>
          )}
          <Box>
            <Typography variant="h6">{user.name}</Typography>
            <Typography color="text.secondary">{user.location}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
          </Box>
        </Stack>

        {/* Editable Fields */}
        {editable ? (
          <>
            <TextField
              label="Name"
              fullWidth
              value={user.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
            <TextField
              label="Location"
              fullWidth
              value={user.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
            />
            <TextField
              label="Email"
              fullWidth
              value={user.email}
              disabled
            />
            <Autocomplete
              multiple
              options={allSkills}
              value={user.offerSkills}
              onChange={(e, value) => handleFieldChange('offerSkills', value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Skills Offering" />
              )}
            />
            <Autocomplete
              multiple
              options={allSkills}
              value={user.wantSkills}
              onChange={(e, value) => handleFieldChange('wantSkills', value)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={option}
                    label={option}
                    {...getTagProps({ index })}
                    sx={{ bgcolor: '#e1bee7', color: '#4a148c' }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Skills Wanted" />
              )}
            />
          </>
        ) : (
          <>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Location:</strong> {user.location}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Box>
              <Typography fontWeight={600} mb={1}>Skills Offering:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                {user.offerSkills.map((skill) => (
                  <Chip key={skill} label={skill} sx={{ bgcolor: '#f3e5f5', color: '#6a1b9a' }} />
                ))}
              </Stack>

              <Typography fontWeight={600} mb={1}>Skills Wanted:</Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {user.wantSkills.map((skill) => (
                  <Chip key={skill} label={skill} sx={{ bgcolor: '#e1bee7', color: '#4a148c' }} />
                ))}
              </Stack>
            </Box>
          </>
        )}

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ bgcolor: '#6a1b9a', flex: 1 }}
            onClick={() => editable ? handleSave() : setEditable(true)}
          >
            {editable ? 'Save Changes' : 'Edit Profile'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push('/change-password')}
            sx={{ flex: 1 }}
          >
            Change Password
          </Button>
        </Stack>

        {/* Danger Zone */}
        <Divider sx={{ my: 4 }} />
        <Typography variant="h6" color="error">
          Danger Zone
        </Typography>
        <Typography color="text.secondary" mb={1}>
          Once you delete your account, there is no going back. Please be certain.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setShowDeleteDialog(true)}
          sx={{ borderColor: 'error.main', color: 'error.main', mt: 1 }}
        >
          Delete Account
        </Button>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Please enter your password to confirm account deletion:
          </Typography>
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
