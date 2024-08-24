'use client';
import React, { useEffect } from 'react';
import { IconSpinner } from '@/components/icons';
import { logout } from '@/lib/actions/auth';

export default function LogoutPage() {
  useEffect(() => {
    setTimeout(() => {
      logout();
    }, 2000);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center space-x-2">
        <IconSpinner className="h-5 w-5 animate-spin stroke-zinc-800" />
        <p className="text-base font-medium">Logging out...</p>
      </div>
    </div>
  );
}
