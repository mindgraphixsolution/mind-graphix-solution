import { Metadata } from 'next';
import QuotePage from '@/components/pages/QuotePage';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Demander un Devis | Mind Graphix Solution',
  description: 'Obtenez une estimation gratuite pour votre projet de design ou de développement.',
};

export default function DevisPage() {
  return (
    <PageTransition>
      <QuotePage />
    </PageTransition>
  );
}
