'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Skeleton,
} from '@mui/material';
import apiClient from '@/lib/api/client';
import { AxiosError } from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';

const PRIMARY = '#0A2E5C';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'closed';
  adminReply?: string;
  createdAt: string;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDispute, setIsDispute] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Effect data fetch
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await apiClient.get('/tickets');
        setTickets(res.data.tickets || []);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Failed to load tickets');
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleCreateTicket = async () => {
    if (!subject.trim() || !message.trim()) {
      alert('Please fill all fields');
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.post('/support/ticket', {
        subject,
        message,
        dispute: isDispute,
      });
      setDialogOpen(false);
      setSubject('');
      setMessage('');
      setIsDispute(false);
      // Re-fetch tickets
      const res = await apiClient.get('/tickets');
      setTickets(res.data.tickets || []);
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to create ticket');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this ticket?')) return;
    setDeletingId(id);
    try {
      await apiClient.delete(`/tickets/${id}`);
      setTickets(tickets.filter((t) => t.id !== id));
    } catch (err) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || 'Failed to delete');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} sx={{ mb: 2 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="20%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
        Support
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ bgcolor: PRIMARY }}
          onClick={() => { setIsDispute(false); setDialogOpen(true); }}
        >
          New Ticket
        </Button>
        <Button
          variant="contained"
          startIcon={<WarningIcon />}
          sx={{ bgcolor: 'error.main' }}
          onClick={() => { setIsDispute(true); setDialogOpen(true); }}
        >
          Dispute
        </Button>
      </Box>

      {tickets.length === 0 ? (
        <Typography color="text.secondary">No support tickets yet.</Typography>
      ) : (
        <List>
          {tickets.map((ticket) => (
            <Card key={ticket.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {ticket.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ticket.message}
                    </Typography>
                    {ticket.adminReply && (
                      <Typography variant="body2" sx={{ mt: 1, color: 'primary.main' }}>
                        Reply: {ticket.adminReply}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={ticket.status}
                      color={ticket.status === 'closed' ? 'success' : 'warning'}
                      size="small"
                    />
                    {ticket.status === 'open' && (
                      <IconButton
                        onClick={() => handleDelete(ticket.id)}
                        disabled={deletingId === ticket.id}
                        size="small"
                      >
                        {deletingId === ticket.id ? <CircularProgress size={20} /> : <DeleteIcon color="error" />}
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      )}

      <Dialog open={dialogOpen} onClose={() => !submitting && setDialogOpen(false)}>
        <DialogTitle>{isDispute ? 'File a Dispute' : 'New Support Ticket'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject"
            fullWidth
            margin="dense"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            margin="dense"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateTicket}
            disabled={submitting}
            sx={{ bgcolor: isDispute ? 'error.main' : PRIMARY }}
          >
            {submitting ? <CircularProgress size={24} color="inherit" /> : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}