import './globals.css';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'WingaPro – Internet Packages & Devices',
  description: 'Buy data bundles, routers, and MiFi – all in one place.',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="logo">Winga<span>Pro</span></Link>
            <nav>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/packages">Packages</Link>
              <Link href="/download">Download</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <Link href="/download" className="btn btn-primary btn-sm">
              <i className="fas fa-download"></i> Get App
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <div className="logo">Winga<span>Pro</span></div>
              <p>Your trusted digital platform for internet packages and devices.</p>
            </div>
            <div>
              <h5>Quick Links</h5>
              <ul>
                <li><Link href="/packages">Packages</Link></li>
                <li><Link href="/download">Download APK</Link></li>
              </ul>
            </div>
            <div>
              <h5>Support</h5>
              <ul>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="container footer-bottom">
            <span>&copy; {new Date().getFullYear()} WingaPro. All rights reserved.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}