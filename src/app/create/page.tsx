'use client';

import React, { Suspense } from 'react';
import CreateFlow from '@/components/create/CreateFlow';

export default function CreatePage() {
  return (
    <main className="h-screen bg-black">
      <Suspense fallback={<div className="flex items-center justify-center h-full text-white">Loading...</div>}>
        <CreateFlow />
      </Suspense>
    </main>
  );
}
