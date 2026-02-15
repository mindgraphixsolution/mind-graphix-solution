import { Metadata } from 'next';
import BlogPage from '@/components/pages/BlogPage';
import PageTransition from '@/components/ui/PageTransition';

export const metadata: Metadata = {
  title: 'Blog & Actualités | Mind Graphix Solution',
  description: 'Découvrez nos derniers articles sur le design, le développement web et les innovations technologiques.',
  openGraph: {
    title: 'Le Blog de Mind Graphix',
    description: 'Insights et tendances du monde digital.',
    images: ['/blog-og.png'],
  },
};

export default function Page() {
  return (
    <PageTransition>
      <BlogPage />
    </PageTransition>
  );
}
