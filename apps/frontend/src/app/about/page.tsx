import { Metadata } from 'next';
import About from '@/components/About';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'À Propos de Nous | Mind Graphix Solution',
  description: 'Apprenez-en plus sur notre mission, notre vision et l\'équipe derrière Mind Graphix.',
  openGraph: {
    title: 'À Propos | Mind Graphix',
    description: 'L\'excellence créative au service de votre vision digitale.',
    images: ['/about-og.png'],
  },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <About />
      </div>
    </PageTransition>
  );
}
