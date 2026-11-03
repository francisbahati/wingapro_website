// app/(auth)/delete-account/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import apiClient from '@/lib/api/client';

interface Precheck {
  role: string;
  balance: number;
  activeBuyerOrders: number;
  activeSellerOrders: number;
  pendingWithdrawals: number;
}

const ACTIVE_ORDER_STATUSES = ['pending_payment', 'waiting', 'taken', 'delivered'];

function fmt(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

export default function DeleteAccountPage() {
  const router = useRouter();

  // ── Precheck state ──
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [precheck, setPrecheck] = useState<Precheck | null>(null);
  const [blockers, setBlockers] = useState<string[]>([]);

  // ── Confirmation state ──
  const [forfeitBalance, setForfeitBalance] = useState(false);
  const [understand, setUnderstand] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  // ── Submission state ──
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const loadPrecheck = async () => {
    setLoading(true);
    setLoadError('');
    try {
      // 1. Profile
      const profileRes = await apiClient.get('/users/profile');
      const u = profileRes.data.user ?? {};
      const role: string = u.role || 'customer';
      const balance = Number(u.wallet_balance ?? 0);

      // 2. Buyer active orders
      let activeBuyerOrders = 0;
      try {
        const p = await apiClient.get('/purchases');
        const list: any[] = p.data.purchases ?? [];
        activeBuyerOrders = list.filter((x) =>
          ACTIVE_ORDER_STATUSES.includes(x.orderStatus)
        ).length;
      } catch {
        activeBuyerOrders = 0;
      }

      // 3. Seller active assigned orders (only sellers)
      let activeSellerOrders = 0;
      if (role === 'seller') {
        try {
          const p = await apiClient.get('/seller/assigned-orders');
          const list: any[] = p.data.orders ?? [];
          activeSellerOrders = list.filter((x) =>
            ACTIVE_ORDER_STATUSES.includes(x.orderStatus)
          ).length;
        } catch {
          activeSellerOrders = 0;
        }
      }

      // 4. Pending withdrawals (pending + processing)
      let pendingWithdrawals = 0;
      try {
        const [pendRes, procRes] = await Promise.all([
          apiClient.get('/withdraw/history?status=pending&limit=100'),
          apiClient.get('/withdraw/history?status=processing&limit=100'),
        ]);
        pendingWithdrawals =
          Number(pendRes.data.total ?? 0) + Number(procRes.data.total ?? 0);
      } catch {
        pendingWithdrawals = 0;
      }

      const data: Precheck = {
        role,
        balance,
        activeBuyerOrders,
        activeSellerOrders,
        pendingWithdrawals,
      };
      setPrecheck(data);

      // Build blocker list
      const list: string[] = [];
      if (balance < 0) {
        list.push(
          `Your account has an outstanding debt of TZS ${fmt(
            Math.abs(balance)
          )}. Please settle it before deleting your account.`
        );
      }
      if (activeBuyerOrders > 0) {
        list.push(
          `You have ${activeBuyerOrders} active order(s) as a buyer. Complete or cancel them first.`
        );
      }
      if (activeSellerOrders > 0) {
        list.push(
          `You have ${activeSellerOrders} active order(s) assigned to you as a seller. Deliver or reject them first.`
        );
      }
      if (pendingWithdrawals > 0) {
        list.push(
          `You have ${pendingWithdrawals} pending withdrawal(s). Wait for them to complete first.`
        );
      }
      setBlockers(list);
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.message || 'Could not check your account status.'
          : 'An unexpected error occurred.';
      setLoadError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrecheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmPhraseOk = confirmText.trim().toUpperCase() === 'DELETE';
  const balanceOk =
    !precheck || precheck.balance <= 0 || forfeitBalance;
  const canSubmit =
    !submitting &&
    blockers.length === 0 &&
    understand &&
    confirmPhraseOk &&
    balanceOk &&
    !!precheck;

  const openDialog = () => {
    if (!canSubmit) return;
    setSubmitError('');
    setDialogOpen(true);
  };

  const doDelete = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload: Record<string, unknown> = { confirm: true };
      if (precheck && precheck.balance > 0) payload.forfeitBalance = true;

      await apiClient.delete('/users/delete-account', { data: payload });

      // Account is gone. Clear local auth state and hard-redirect.
      try {
        await apiClient.post('/auth/logout');
      } catch {
        /* user already deleted — expected */
      }

      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const secure = window.location.protocol === 'https:';
        const base = `path=/; max-age=0; samesite=lax${secure ? '; secure' : ''}`;
        document.cookie = `jwt_token=; ${base}`;
        document.cookie = `user_role=; ${base}`;
        // Full reload so AuthContext re-initialises as logged-out
        window.location.href = '/account-deleted';
      }
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.message || 'Failed to delete your account.'
          : 'An unexpected error occurred.';
      setSubmitError(msg);
      setDialogOpen(false);
      // If the backend reports a new blocker, refresh
      loadPrecheck();
    } finally {
      setSubmitting(false);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (loadError) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
        <Button
          variant="contained"
          startIcon={<RefreshRoundedIcon />}
          onClick={loadPrecheck}
        >
          Retry
        </Button>
        <Button
          variant="text"
          onClick={() => router.push('/profile')}
          sx={{ ml: 1 }}
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', p: { xs: 2, md: 3 } }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, color: 'var(--navy)', mb: 1 }}
      >
        Delete My Account
      </Typography>
      <Typography sx={{ color: 'var(--text-muted)', mb: 3 }}>
        This permanently removes your account and personal data. Please review
        carefully before continuing.
      </Typography>

      {/* Warning banner */}
      <Box
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2.5,
          bgcolor: 'var(--error-muted)',
          border: '1px solid rgba(239,68,68,0.35)',
          display: 'flex',
          gap: 1.5,
        }}
      >
        <WarningAmberRoundedIcon sx={{ color: 'var(--error)', flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontWeight: 700, color: 'var(--error)' }}>
            This action is permanent
          </Typography>
          <Typography
            sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}
          >
            Once you delete your account, you cannot log in again and cannot
            recover any data. Please read the details below carefully before
            continuing.
          </Typography>
        </Box>
      </Box>

      {/* What will be deleted */}
      <Card
        sx={{
          mb: 2,
          borderRadius: 2.5,
          bgcolor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <DeleteForeverRoundedIcon sx={{ color: 'var(--error)', fontSize: 20 }} />
            <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>
              What will be deleted
            </Typography>
          </Stack>
          <BulletList
            items={[
              'Your profile and personal information',
              'Access to your WINGA PRO wallet',
              'Your notifications and support history',
              'Your in-app order history view',
            ]}
          />
        </CardContent>
      </Card>

      {/* What we keep */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 2.5,
          bgcolor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <InfoOutlinedIcon sx={{ color: 'var(--info)', fontSize: 20 }} />
            <Typography sx={{ fontWeight: 700, color: 'var(--navy)' }}>
              What we keep for legal compliance
            </Typography>
          </Stack>
          <Typography
            sx={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}
          >
            Transaction records may be retained for up to <strong>7 years</strong>{' '}
            as required by the Bank of Tanzania and the Anti-Money Laundering Act,
            2006. These records are stored securely and are only accessible to
            authorized staff for regulatory and dispute-resolution purposes.
          </Typography>
        </CardContent>
      </Card>

      {/* Blockers */}
      {blockers.length > 0 && (
        <Box
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 2.5,
            bgcolor: 'var(--warning-muted)',
            border: '1px solid rgba(245,158,11,0.35)',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <BlockRoundedIcon sx={{ color: 'var(--warning)', fontSize: 20 }} />
            <Typography sx={{ fontWeight: 700, color: 'var(--warning)' }}>
              Before you can delete your account
            </Typography>
          </Stack>
          <BulletList items={blockers} dotColor="var(--warning)" />
          <Button
            variant="text"
            startIcon={<RefreshRoundedIcon />}
            onClick={loadPrecheck}
            sx={{ mt: 1, color: 'var(--warning)', textTransform: 'none' }}
          >
            Check again
          </Button>
        </Box>
      )}

      {/* Confirmation (only when no hard blockers) */}
      {blockers.length === 0 && precheck && (
        <>
          {/* Forfeit balance warning */}
          {precheck.balance > 0 && (
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2.5,
                bgcolor: 'var(--error-muted)',
                border: '1px solid rgba(239,68,68,0.35)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  color: 'var(--text)',
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Your wallet balance of TZS {fmt(precheck.balance)} will be
                permanently forfeited if you continue.
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={forfeitBalance}
                    onChange={(e) => setForfeitBalance(e.target.checked)}
                    sx={{ color: 'var(--error)', '&.Mui-checked': { color: 'var(--error)' } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                    I understand my wallet balance will be forfeited
                  </Typography>
                }
              />
            </Box>
          )}

          {/* Understand permanent */}
          <Card
            sx={{
              mb: 2,
              borderRadius: 2.5,
              bgcolor: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <FormControlLabel
              sx={{ px: 2, py: 0.5, m: 0, display: 'flex' }}
              control={
                <Checkbox
                  checked={understand}
                  onChange={(e) => setUnderstand(e.target.checked)}
                  sx={{ color: 'var(--error)', '&.Mui-checked': { color: 'var(--error)' } }}
                />
              }
              label={
                <Typography sx={{ fontSize: '0.875rem', color: 'var(--text)' }}>
                  I understand this action cannot be undone and my account will be
                  permanently deleted
                </Typography>
              }
            />
          </Card>

          {/* Type DELETE */}
          <TextField
            fullWidth
            label="Type DELETE to confirm"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: confirmPhraseOk ? (
                <Box sx={{ color: 'var(--error)', mr: 1 }}>✓</Box>
              ) : undefined,
            }}
          />

          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={!canSubmit}
            onClick={openDialog}
            startIcon={<DeleteForeverRoundedIcon />}
            sx={{
              py: 1.6,
              bgcolor: 'var(--error)',
              '&:hover': { bgcolor: '#B91C1C' },
              '&.Mui-disabled': { bgcolor: 'rgba(239,68,68,0.35)', color: '#fff' },
            }}
          >
            Delete My Account Permanently
          </Button>

          <Button
            variant="text"
            fullWidth
            onClick={() => router.push('/profile')}
            sx={{ mt: 1, color: 'var(--text-muted)' }}
          >
            Never mind, go back
          </Button>
        </>
      )}

      {/* Final confirm dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => !submitting && setDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'var(--surface)',
            border: '1px solid var(--border)',
            backgroundImage: 'none',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle
          sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--error)' }}
        >
          <WarningAmberRoundedIcon />
          Are you absolutely sure?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'var(--text)', lineHeight: 1.6 }}>
            Your account will be permanently deleted immediately. You will be
            logged out on all devices and cannot log in again.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            disabled={submitting}
            sx={{ color: 'var(--text-muted)' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={doDelete}
            disabled={submitting}
            sx={{
              bgcolor: 'var(--error)',
              '&:hover': { bgcolor: '#B91C1C' },
            }}
          >
            {submitting ? (
              <CircularProgress size={20} sx={{ color: '#fff' }} />
            ) : (
              'Yes, delete my account'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function BulletList({
  items,
  dotColor = 'var(--text-muted)',
}: {
  items: string[];
  dotColor?: string;
}) {
  return (
    <Stack spacing={0.75}>
      {items.map((t, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ color: dotColor, fontWeight: 700 }}>•</Box>
          <Typography sx={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.55 }}>
            {t}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}