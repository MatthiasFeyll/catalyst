export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Imprint | Matthias Feyll - Software Developer',
  description:
    'Legal information and contact details for Matthias Feyll, Software Developer based in Darmstadt, Germany.',
  robots: 'index, follow',
  openGraph: {
    title: 'Imprint | Matthias Feyll - Software Developer',
    description:
      'Legal information and contact details for Matthias Feyll, Software Developer based in Darmstadt, Germany.',
    url: 'https://matthias-feyll.de/imprint',
    type: 'website',
  },
};

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
