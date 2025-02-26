import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Results', path: '/results' },
    { name: 'Bounty Board', path: '/bounty-board' },
    { name: 'Hunter Notes', path: '/hunter-notes' },
    { name: 'Subscribe', path: '/subscribe' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--primary)] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Terminal className="w-8 h-8 text-[var(--text)]" />
            <span className="text-2xl font-bold">Agent Gear</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        <nav
          className={cn(
            'md:hidden absolute left-0 right-0 bg-black border-b border-[var(--primary)] transition-all duration-300 ease-in-out',
            isMenuOpen ? 'top-16' : '-top-full'
          )}
        >
          <div className="container mx-auto py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}