// app/components/ThemeToggle.tsx
'use client';

import { Box, IconButton, Tooltip } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useThemeMode } from '@/context/ThemeModeContext';

export default function ThemeToggle({ size = 'medium' }: { size?: 'small' | 'medium' }) {
  const { mode, toggle } = useThemeMode();
  const isDark = mode === 'dark';

  const dim = size === 'small' ? 36 : 40;
  const iconSize = size === 'small' ? 18 : 20;

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} arrow>
      <IconButton
        onClick={toggle}
        aria-label="Toggle theme"
        sx={{
          width: dim,
          height: dim,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 2.5,
          border: '1px solid var(--border)',
          bgcolor: 'var(--surface)',
          transition: 'all .25s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            borderColor: 'var(--cyan)',
            bgcolor: 'var(--cyan-muted)',
            transform: 'rotate(15deg) scale(1.05)',
          },
          '&:active': {
            transform: 'rotate(15deg) scale(0.95)',
          },
        }}
      >
        {/* Dark icon — slides in when dark mode */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition:
              'transform .45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity .3s ease',
            transform: isDark
              ? 'translateY(0) rotate(0deg)'
              : 'translateY(-130%) rotate(-90deg)',
            opacity: isDark ? 1 : 0,
          }}
        >
          <DarkModeRoundedIcon sx={{ fontSize: iconSize, color: 'var(--cyan)' }} />
        </Box>

        {/* Light icon — slides out when dark mode */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition:
              'transform .45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity .3s ease',
            transform: isDark
              ? 'translateY(130%) rotate(90deg)'
              : 'translateY(0) rotate(0deg)',
            opacity: isDark ? 0 : 1,
          }}
        >
          <LightModeRoundedIcon sx={{ fontSize: iconSize, color: 'var(--navy)' }} />
        </Box>
      </IconButton>
    </Tooltip>
  );
}