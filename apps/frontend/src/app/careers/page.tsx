import { Metadata } from 'next';
import CareerPage from '@/components/pages/CareerPage';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Carrières | Mind Graphix Solution',
  description: 'Rejoignez notre équipe de créatifs et de développeurs passionnés.',
};

export default function Page() {
  return (
    <PageTransition>
      <CareerPage />
    </PageTransition>
  );
}
