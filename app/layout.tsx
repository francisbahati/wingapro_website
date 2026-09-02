// app/layout.tsx
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';  // ✅ Correct path
import Navbar from '@/components/Navbar';              // ✅ Correct path
import React from 'react';

export const metadata = {
  title: 'WingaPro – Internet Packages & Devices',
  description: 'Buy data bundles, routers, and MiFi – all in one place.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
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
                  <li><a href="/packages">Packages</a></li>
                  <li><a href="/download">Download APK</a></li>
                </ul>
              </div>
              <div>
                <h5>Support</h5>
                <ul>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="container footer-bottom">
              <span>&copy; {new Date().getFullYear()} WingaPro. All rights reserved.</span>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}