import { Metadata } from 'next';
import Portfolio from '@/components/Portfolio';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Notre Portfolio | Mind Graphix Solution',
  description: 'Découvrez nos réalisations en design, développement web et solutions digitales pour nos clients.',
  openGraph: {
    title: 'Portfolio | Mind Graphix',
    description: 'Une vitrine de nos projets les plus innovants.',
    images: ['/portfolio-og.png'],
  },
};

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Portfolio />
      </div>
    </PageTransition>
  );
}
