import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'EnerVerse - University Energy Management',
  description: 'Campus-wide multi-screen energy monitoring, building overview, room telemetry controls, and alerts management system.',
  openGraph: {
    title: 'EnerVerse - University Energy Management',
    description: 'Campus-wide multi-screen energy monitoring, building overview, room telemetry controls, and alerts management system.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnerVerse - University Energy Management',
    description: 'Campus-wide multi-screen energy monitoring, building overview, room telemetry controls, and alerts management system.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..900;1,300..900&family=Manrope:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-[#0b1326] text-[#dae2fd] antialiased">
        {children}
      </body>
    </html>
  );
}
