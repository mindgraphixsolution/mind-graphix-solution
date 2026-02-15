import { Metadata } from 'next';
import Contact from '@/components/Contact';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Contactez-nous | Mind Graphix Solution',
  description: 'Prêt à donner vie à votre projet ? Contactez notre équipe dès aujourd\'hui pour un devis gratuit.',
  openGraph: {
    title: 'Contact | Mind Graphix',
    description: 'Discutons de votre prochain projet innovant.',
    images: ['/contact-og.png'],
  },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="pt-20 min-h-screen">
        <Contact />
      </div>
    </PageTransition>
  );
}
