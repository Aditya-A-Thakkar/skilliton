'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Button,
  Snackbar,
  Alert,
  Box,
  Chip,
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import DownloadIcon from '@mui/icons-material/Download';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [swapStats, setSwapStats] = useState({});
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success', text: '' });

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  async function fetchUsers() {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data);
    setFilteredUsers(data);
  }

  async function fetchStats() {
    const res = await fetch('/api/admin/swaps');
    setSwapStats(await res.json());
  }

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    setFilteredUsers(users.filter(u => u.name.toLowerCase().includes(q)));
  };

  const banUser = async (id) => {
    await fetch(`/api/admin/ban/${id}`, { method: 'POST' });
    setSnackbar({ open: true, severity: 'info', text: 'User banned' });
    fetchUsers();
  };

  const sendPlatformMessage = async () => {
    if (!message.trim()) return;
    await fetch('/api/admin/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    setSnackbar({ open: true, severity: 'success', text: 'Message sent' });
    setMessage('');
  };

  const download = (type) => window.open(`/api/admin/download/${type}`, '_blank');

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Users Panel */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Registered Users</Typography>
            <TextField
              placeholder="Search by name…"
              value={search}
              onChange={handleSearch}
              fullWidth margin="normal"
            />
            <List sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {filteredUsers.map(u => (
                <React.Fragment key={u.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src={u.avatarUrl}>{u.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={u.name} secondary={u.email} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" color="error" onClick={() => banUser(u.id)}>
                        <BlockIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {filteredUsers.length === 0 && (
                <Box p={2}>
                  <Typography color="text.secondary" textAlign="center">No users found</Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Swap Stats */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Swaps Overview</Typography>
            <Grid container spacing={1}>
              {['PENDING', 'ACCEPTED', 'REJECTED', 'DELETED'].map(status => (
                <Grid item xs={6} key={status}>
                  <Chip label={`${status}: ${swapStats[status] || 0}`} color="primary" />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Broadcast Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Broadcast Message</Typography>
            <TextField
              placeholder="Enter message for all users"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth multiline rows={3} margin="normal"
            />
            <Button variant="contained" onClick={sendPlatformMessage}>
              Send
            </Button>
          </Paper>
        </Grid>

        {/* Download Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Download Reports</Typography>
            {['user-activity', 'feedback', 'swap-stats'].map(type => (
              <Button
                key={type}
                startIcon={<DownloadIcon />}
                variant="outlined"
                sx={{ mr: 2, mb: 1 }}
                onClick={() => download(type)}
              >
                {type.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </Button>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.text}</Alert>
      </Snackbar>
    </Container>
  );
}
