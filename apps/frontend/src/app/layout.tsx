import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fontSans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700', '900'],
});
import { AdminProvider } from '@/context/AdminContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { ToastProvider } from '@/components/ui/ToastContext';
import ClientWrapper from '@/components/ClientWrapper';

export const metadata: Metadata = {
  title: {
    default: 'Mind Graphix Solution | Agence Créative & Digitale Premium',
    template: '%s | Mind Graphix Solution',
  },
  description: 'Mind Graphix Solution est une agence spécialisée dans le design graphique, le développement web sur mesure et les solutions digitales innovantes à Bobo-Dioulasso, Burkina Faso.',
  keywords: ['design graphique', 'développement web', 'Burkina Faso', 'Bobo-Dioulasso', 'UI/UX design', 'agence digitale', 'e-commerce', 'marketing digital', 'création de logo', 'stratégie digitale'],
  authors: [{ name: 'Badior OUATTARA' }],
  creator: 'Badior OUATTARA',
  publisher: 'Mind Graphix Solution',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mindgraphix.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mind Graphix Solution | Excellence Créative & Digitale',
    description: 'Propulsez votre entreprise avec des designs percutants et des solutions web de haute performance.',
    url: 'https://mindgraphix.com',
    siteName: 'Mind Graphix Solution',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mind Graphix Solution - Agence Digitale',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mind Graphix Solution | Excellence Créative',
    description: 'Solutions premium en design et développement web.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-de-verification-google', // À remplacer par le vrai code si disponible
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Le contenu est enveloppé par LanguageProvider qui gère la langue au niveau client.
  // Pour le SEO initial, on garde 'fr', mais l'application s'adaptera dynamiquement.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Mind Graphix Solution',
    image: 'https://mindgraphix.com/og-image.png',
    '@id': 'https://mindgraphix.com',
    url: 'https://mindgraphix.com',
    telephone: '+22601511146',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sarala, Rue 17.151, Porte 121',
      addressLocality: 'Bobo-Dioulasso',
      addressRegion: 'Hauts-Bassins',
      addressCountry: 'BF',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.1833,
      longitude: -4.2833,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '08:00',
      closes: '18:00'
    },
    sameAs: [
      'https://facebook.com/mindgraphix',
      'https://linkedin.com/company/mindgraphix',
      'https://instagram.com/mindgraphix'
    ]
  };

  return (
    <html lang="fr" className={`${inter.variable} ${fontSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <PreferencesProvider>
              <AdminProvider>
                <ToastProvider>
                  <ClientWrapper>
                    {children}
                  </ClientWrapper>
                </ToastProvider>
              </AdminProvider>
            </PreferencesProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
