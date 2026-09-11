import { Box, Skeleton, Stack } from '@mui/material';

export default function AuthLoading() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="rounded" height={40} width={240} sx={{ mb: 3 }} />
      <Stack spacing={2}>
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={120} />
      </Stack>
    </Box>
  );
}