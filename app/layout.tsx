import Navbar from './navbar';
import Footer from './footer';
import Cursor from './cursor';
import SideBars from './sidebars';
import LoaderWrapper from './loader-wrapper';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D0D0D',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.odinalx.fr'),
  title: {
    default: 'Odin Alexandre - Full Stack Developer',
    template: '%s | Odin Alexandre'
  },
  description: 'Full Stack Developer passionate about building intuitive and accessible user interfaces. Portfolio showcasing my projects and experience in React, Next.js, and modern web development.',
  keywords: ['Full Stack Developer', 'Web Developer', 'React', 'Next.js', 'Tailwind CSS', 'Portfolio', 'JavaScript', 'TypeScript', 'Frontend', 'Backend'],
  authors: [{ name: 'Odin Alexandre' }],
  creator: 'Odin Alexandre',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.odinalx.fr',
    title: 'Odin Alexandre - Full Stack Developer',
    description: 'Full Stack Developer passionate about building intuitive and accessible user interfaces. Portfolio showcasing my projects and experience.',
    siteName: 'Odin Alexandre Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Odin Alexandre - Full Stack Developer',
    description: 'Full Stack Developer passionate about building intuitive and accessible user interfaces.',
    creator: '@_Odin_Dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased flex flex-col items-center text-primary text-base md:text-lg leading-6 md:leading-7`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <LoaderWrapper>
          <Cursor />
          <Navbar />
          <SideBars />
          {children}
          <Footer />
        </LoaderWrapper>
      </body>
    </html>
  );
}
