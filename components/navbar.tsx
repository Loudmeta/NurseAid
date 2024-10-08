"use client"

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold">
            NurseAid
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/account" className="text-sm sm:text-base text-foreground hover:text-primary">
              Account
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}