'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import MENU from '@/data/menu';
import Logo from './Logo';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-pitch-950/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl md:px-8">
        <Logo />

        <ul className="items-center hidden gap-1 p-1 rounded-full md:flex glass">
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-5 py-2 text-sm font-semibold rounded-full transition ${
                  isActive(item.href)
                    ? 'bg-volt text-pitch-950'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.menu}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="grid text-2xl rounded-full md:hidden size-10 place-items-center glass"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col gap-1 px-4 pb-4 md:hidden animate-fade-up">
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-3 text-lg font-bold uppercase rounded-xl font-display ${
                  isActive(item.href)
                    ? 'bg-volt text-pitch-950'
                    : 'text-white/80 bg-white/5'
                }`}
              >
                {item.menu}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
