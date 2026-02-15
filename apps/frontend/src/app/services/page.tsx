import { Metadata } from 'next';
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: 'Nos Services | Mind Graphix Solution',
  description: 'Découvrez nos solutions premium en design graphique, développement web, UI/UX design et marketing digital.',
  openGraph: {
    title: 'Services Premium | Mind Graphix',
    description: 'Expertise en Design et Développement pour propulser votre entreprise.',
    images: ['/services-og.png'],
  },
};

export default function Page() {
  return <Services />;
}
