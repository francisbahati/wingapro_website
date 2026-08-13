// app/page.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import HeroBackground from '@/components/HeroBackground';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount?: number;
  validUntil?: string;
}

// Network image mapping – adjust paths if your images are elsewhere
const networkImages: Record<string, string> = {
  Halotel: '/images/halotel.webp',
  Tigo: '/images/yas.webp',
  Vodacom: '/images/vodacom.webp',
  Airtel: '/images/airtel.webp',
};

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/promotions`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPromotions(data.promotions || []);
      })
      .catch(() => {});
  }, []);

  const networks = ['Halotel', 'Tigo', 'Vodacom', 'Airtel'];

  return (
    <>
      {/* ======== HERO ======== */}
      <section className="hero">
        <div className="container hero-container" style={{ position: 'relative' }}>
          <HeroBackground />
          <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
            <h1>
              {isAuthenticated ? (
                <>Welcome back, <span className="highlight">{user?.username}</span>!</>
              ) : (
                <>Smart Internet <span>Packages</span> for Everyone</>
              )}
            </h1>
            <p>
              {isAuthenticated
                ? 'Browse our latest offers or check your orders and wallet.'
                : 'Fast, reliable, and affordable data plans – choose what fits your life.'}
            </p>
            <div className="hero-buttons">
              <Link href="/packages" className="btn btn-primary btn-lg">
                Explore Packages <i className="fas fa-arrow-right"></i>
              </Link>
              {!isAuthenticated && (
                <Link href="/login" className="btn btn-outline btn-lg">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
          <div className="hero-image" style={{ position: 'relative', zIndex: 1 }}>
            <Image
              src="/buckete.png"
              alt="WingaPro App"
              width={400}
              height={400}
              priority
              className="hero-img"
            />
          </div>
        </div>
      </section>

      {/* ======== TRUST STATS ======== */}
      <section className="trust-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Packages Sold</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ======== WHY CHOOSE US ======== */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose WingaPro?</h2>
          <p className="section-subtitle">
            We make buying internet packages simple, fast, and secure.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Blazing Fast</h3>
              <p>Enjoy high‑speed data with minimal latency – perfect for streaming and work.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payments</h3>
              <p>All transactions are encrypted and protected; your wallet is safe.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Our support team is always ready to help you with any questions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💸</div>
              <h3>Best Prices</h3>
              <p>Competitive rates on all networks – no hidden fees, only value.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== HOW IT WORKS ======== */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <p className="section-subtitle">Get connected in just three simple steps.</p>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose a Package</h3>
              <p>Browse our data plans by network and pick the one that suits you.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Enter Recipient Details</h3>
              <p>Provide the phone number and name of the person who will receive the data.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Confirm & Enjoy</h3>
              <p>Complete your purchase and the data will be sent immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======== NETWORK SELECTION ======== */}
      <section className="networks-section">
        <div className="container">
          <h2>Choose Your Network</h2>
          <div className="network-grid">
            {networks.map(net => (
              <Link key={net} href={`/packages?network=${net}`} className="network-card">
                <div className="network-image-wrapper">
                  <Image
                    src={networkImages[net]}
                    alt={`${net} logo`}
                    width={100}
                    height={60}
                    className="network-logo"
                    style={{ objectFit: 'contain' }}
                    unoptimized // Remove if you want Next.js optimization
                  />
                </div>
                <span>{net}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======== PROMOTIONS ======== */}
      {promotions.length > 0 && (
        <section className="promotions-section">
          <div className="container">
            <h2>🔥 Active Promotions</h2>
            <div className="promo-grid">
              {promotions.slice(0, 3).map(p => (
                <div key={p.id} className="promo-card">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  {p.discount && <span className="discount">{p.discount}% OFF</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======== CALL TO ACTION – DOWNLOAD APP ======== */}
      <section className="cta-download">
        <div className="container">
          <div className="cta-content">
            <div>
              <h2>Get the WingaPro App</h2>
              <p>Download our official Android app for a smoother experience – manage your wallet, view orders, and get exclusive offers.</p>
              <Link href="/download" className="btn btn-primary btn-lg">
                <i className="fas fa-download"></i> Download APK
              </Link>
            </div>
            <div className="cta-image">
              <i className="fas fa-mobile-alt" style={{ fontSize: '4rem', color: 'white' }}></i>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}