'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import HomeExtras from '@/components/HomeExtras';
import PageTransition from '@/components/ui/PageTransition';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <PageTransition>
      <Hero />
      <HomeExtras />
    </PageTransition>
  );
}
