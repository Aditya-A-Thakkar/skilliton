'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Chip,
  Button,
} from '@mui/material';

const SwapRequestsPage = () => {
  const [requests, setRequests] = useState({ sent: [], received: [] });

  // State to track the currently active tab (sent or received)
  const [activeTab, setActiveTab] = useState('sent');

    // Determine which requests to show based on active tab
  const activeRequests = requests[activeTab];

  useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch("/api/swap-requests", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(({ sent, received }) => {
                setRequests({ sent, received });
            });
        }, []);

    const handleCancelRequest = async (requestId) => {
        const token = localStorage.getItem("token");
        if (!token) return alert("You must be logged in.");

        const res = await fetch(`/api/swap-requests/${requestId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            // Remove the canceled request from UI
            setRequests((prev) => ({
                ...prev,
                sent: prev.sent.filter((r) => r.id !== requestId),
            }));
        } else {
            alert("Failed to cancel request.");
        }
    };


    return (
    <Box p={5}>
      {/* Page title */}
      <Typography variant="h4" mb={4}>
        Swap Requests
      </Typography>

      {/* Toggle Tabs for Sent and Received */}
      <Box
        sx={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.125)',
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {['sent', 'received'].map((tab) => (
          <Box
            key={tab}
            onClick={() => setActiveTab(tab)}
            sx={{
              px: 3,
              pb: 2,
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              fontSize: '1.2rem',
              borderBottom: activeTab === tab ? '2px solid rgba(0,0,0,0.44)' : 'none',
              transition: 'color 0.3s, border-color 0.3s',
              mx: 2,
            }}
          >
            {/* Capitalize tab labels */}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Box>
        ))}
      </Box>

      {/* Grid layout for showing all requests in the active tab */}
      <Grid
        container
        spacing={4}
        justifyContent="center" // Center cards on wider screens
      >
        {activeRequests.map((req) => {
        const user = activeTab === 'sent' ? req.toUser : req.fromUser;
          return (<Grid item key={req.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 3,
                minWidth: 280,
              }}
            >
              <Stack spacing={2}>
                {/* User profile info (photo + name + location) */}
                <Stack direction="row" spacing={2} alignItems="center">
                  {user?.profilePhoto ? (
                    <img
                      src={req.profilePhoto}
                      alt={req.name}
                      width={80}
                      height={80}
                      style={{ borderRadius: '12px' }}
                    />
                  ) : (
                    <Box
                      width={80}
                      height={80}
                      bgcolor="grey.300"
                      borderRadius="12px"
                    />
                  )}
                  <Box>
                    <Typography variant="h6">{user?.name || 'Unknown User'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {user?.location || 'Location not provided'}
                    </Typography>
                  </Box>
                </Stack>

                {/* Skill you are offering */}
                <Box>
                  <Typography fontSize="1rem" fontWeight={600} mb={0.5}>
                    You Offer:
                  </Typography>
                  <Chip
                    label={req.offerSkill?.skill?.name || 'Unknown'}
                    sx={{
                      bgcolor: '#f3e5f5',
                      color: '#6a1b9a',
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>

                {/* Skill you will receive from the other person */}
                <Box>
                  <Typography fontSize="1rem" fontWeight={600} mb={0.5}>
                    You Receive:
                  </Typography>
                  <Chip
                    label={req.wantSkill?.skill?.name || 'Unknown'}
                    sx={{
                      bgcolor: '#e1bee7',
                      color: '#4a148c',
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>

                {/* Action button - label changes depending on tab */}
                  <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 1 }}
                      onClick={() => {
                          if (activeTab === "sent") {
                              handleCancelRequest(req.id);
                          } else {
                              alert("Respond feature coming soon!");
                          }
                      }}
                  >
                      {activeTab === "sent" ? "Cancel Request" : "Respond"}
                  </Button>
              </Stack>
            </Card>
          </Grid>
          )})}
      </Grid>
    </Box>
  );
};

export default SwapRequestsPage;
