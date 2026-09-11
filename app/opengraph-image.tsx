// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'WingaPro — Data Bundles Made Easy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0A2E5C 0%, #123A6B 55%, #00B4D8 165%)',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Soft glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,180,216,0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ fontSize: 36, fontWeight: 900, color: '#0A2E5C' }}>W</span>
          </div>
          <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Winga<span style={{ color: '#22C7E0' }}>Pro</span>
          </span>
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            textAlign: 'center',
            letterSpacing: '-0.03em',
            zIndex: 1,
            maxWidth: '900px',
          }}
        >
          Fast. Reliable.{' '}
          <span style={{ color: '#4DD0E1' }}>Affordable.</span>
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: '32px',
            color: 'rgba(255,255,255,0.85)',
            textAlign: 'center',
            zIndex: 1,
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          Buy data bundles for all major Tanzanian networks — instant delivery.
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '40px',
            zIndex: 1,
          }}
        >
          {['Halotel', 'Tigo', 'Vodacom', 'Airtel'].map((n) => (
            <div
              key={n}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}