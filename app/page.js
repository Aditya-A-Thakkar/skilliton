'use client';

import React from 'react';
import AppTheme from '@/components/shared-theme/AppTheme';

export default function HomePage() {
  return (
    <AppTheme>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to the Homepage</h1>
        <p>This is your basic home screen, styled with the shared theme.</p>
      </main>
    </AppTheme>
  );
}
