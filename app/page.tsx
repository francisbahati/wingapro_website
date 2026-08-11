'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount?: number;
  validUntil?: string;
}

export default function Home() {
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
      {/* Hero Section with image */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Smart Internet <span>Packages</span> for Everyone</h1>
            <p>Fast, reliable, and affordable data plans – choose what fits your life.</p>
            <Link href="/packages" className="btn btn-primary btn-lg">
              Explore Packages <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="hero-image">
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

      {/* Network selection */}
      <section className="networks-section">
        <div className="container">
          <h2>Choose Your Network</h2>
          <div className="network-grid">
            {networks.map(net => (
              <Link key={net} href={`/packages?network=${net}`} className="network-card">
                <i className="fas fa-wifi"></i>
                <span>{net}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
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
    </>
  );
}