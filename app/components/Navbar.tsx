// app/components/Navbar.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';   // ✅ Import Image component
import { useAuth } from '@/context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="container header-inner">
        {/* Logo with image */}
        <Link href="/" className="logo-link">
          <Image
            src="/images/wingapro.webp"   
            alt="WingaPro Logo"
            width={40}             
            height={40}
            className="logo-image"
            priority
          />
          <span className="logo-text">Winga<span>Pro</span></span>
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/packages">Packages</Link>
          <Link href="/download">Download</Link>
          <Link href="/contact">Contact</Link>
          {isAuthenticated && (
            <>
              <Link href="/profile">Profile</Link>
              <Link href="/orders">Orders</Link>
              <Link href="/wallet">Wallet</Link>
            </>
          )}
        </nav>
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <span className="user-greeting">Hi, {user?.username}</span>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm btn-outline">Login</Link>
              <Link href="/register" className="btn btn-sm btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}