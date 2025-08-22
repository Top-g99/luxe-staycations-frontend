import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/25 backdrop-blur border-b border-white/10">
      <div className="px-2 sm:px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="display text-white text-xl sm:text-2xl">Luxe Staycations</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/hotels" className="hover:text-white">Villas</Link>
            <Link href="/about-us" className="hover:text-white">About Us</Link>
            <div className="relative group">
              <button className="hover:text-white flex items-center gap-1">
                Pages
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link href="/about-us" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">About Us</Link>
                <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blog</Link>
                <Link href="/partner-with-us" className="block px-4 py-2 hover:bg-gray-100">Partner With Us</Link>
                <Link href="/contact-us" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">Contact Us</Link>
              </div>
            </div>
            <Link href="/auth/signin" className="hover:text-white">Sign In</Link>
            <Link href="/auth/signup-unified" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-100">Join Now</Link>
          </nav>

          <button className="md:hidden text-white/90" aria-label="Open menu">☰</button>
        </div>
      </div>
    </header>
  );
}


