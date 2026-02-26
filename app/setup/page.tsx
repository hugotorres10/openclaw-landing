'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SetupProgress from '@/components/SetupProgress';

function SetupContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id') || '';

  if (!sessionId) {
    if (typeof window !== 'undefined') window.location.href = '/';
    return null;
  }

  return <SetupProgress sessionId={sessionId} />;
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">A carregar...</p>
      </div>
    }>
      <SetupContent />
    </Suspense>
  );
}
