'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Separate component that uses useSearchParams
function PackagesContent() {
  const searchParams = useSearchParams();
  const networkFilter = searchParams.get('network') || '';

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const products = [
    { name: 'Standard Router', description: 'Great for home and small offices', price: 'TZS 15,000', icon: '📶' },
    { name: 'Premium Router', description: 'High-speed, dual-band, covers large areas', price: 'TZS 25,000', icon: '📡' },
    { name: 'Pocket MiFi', description: 'Portable Wi-Fi, up to 10 devices', price: 'TZS 12,000', icon: '📱' },
    { name: 'MiFi Plus', description: '4G LTE, extended battery', price: 'TZS 18,000', icon: '⚡' },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/packages`;
        const res = await fetch(url);
        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.packages || []);
        const filtered = networkFilter
          ? list.filter((p) => p.network === networkFilter && p.is_active !== false)
          : list.filter((p) => p.is_active !== false);
        setPackages(filtered);
      } catch (err) {
        setError('Failed to load packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [networkFilter]);

  if (loading) return (
    <section className="packages-page"><div className="container"><p>Loading packages...</p></div></section>
  );
  if (error) return (
    <section className="packages-page"><div className="container"><p className="error">{error}</p></div></section>
  );

  return (
    <section className="packages-page">
      <div className="container">
        <h1>Packages & Products</h1>
        {networkFilter && <p className="filter-info">Showing packages for <strong>{networkFilter}</strong></p>}

        <h2>Data Plans</h2>
        {packages.length === 0 ? (
          <p>No packages available for this network.</p>
        ) : (
          <div className="package-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <h3>{pkg.name}</h3>
                <div className="data">{pkg.dataSize}</div>
                <div className="validity">{pkg.validity}</div>
                <div className="price">TZS {pkg.price.toLocaleString()}</div>
                <button className="btn btn-primary btn-sm">Buy Now</button>
              </div>
            ))}
          </div>
        )}

        <h2>Hardware Devices</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.name} className="product-card">
              <div className="icon">{product.icon}</div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="price">{product.price}</div>
              <button className="btn btn-primary btn-sm">Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main page component with Suspense
export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="container"><p>Loading packages...</p></div>}>
      <PackagesContent />
    </Suspense>
  );
}