import { Metadata } from 'next';
import Team from '@/components/Team';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Notre Équipe | Mind Graphix Solution',
  description: 'Rencontrez les experts créatifs et techniques qui donnent vie à vos projets.',
  openGraph: {
    title: 'L\'Équipe | Mind Graphix',
    description: 'Une équipe passionnée par le design et l\'innovation.',
    images: ['/team-og.png'],
  },
};

export default function TeamPage() {
  return (
    <PageTransition>
      <div className="pt-32 min-h-screen">
        <Team />
      </div>
    </PageTransition>
  );
}
