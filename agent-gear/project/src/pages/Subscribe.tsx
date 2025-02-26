import React from 'react';
import { Lock } from 'lucide-react';

export function Subscribe() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <Lock className="w-12 h-12 text-[var(--primary)]" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Premium Access Required</h1>
        <p className="text-lg mb-6">
          Please subscribe to access advanced features and unlimited scans.
        </p>
        <button className="w-full">
          Subscribe Now
        </button>
      </div>
    </div>
  );
}