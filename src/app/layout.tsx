import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Vidhyavani App | Learn Easily, Achieve Certain Success! - By Varsha Jani Dave',
  description:
    'Complete digital education platform for Standard 7 to 12 students featuring video lectures, handwritten study notes (PDF), online mock quizzes, and board exam preparation by Varsha Jani Dave.',
  keywords: [
    'Vidhyavani App',
    'Varsha Jani Dave',
    'Educational Portal',
    'Class 10 Board Exam IMP',
    'Class 12 Gujarati & Commerce',
    'Class 7 to 12 Video Lectures',
    'Online Mock Tests',
  ],
  authors: [{ name: 'Varsha Jani Dave' }],
  openGraph: {
    title: 'Vidhyavani App - Towards Knowledge and Success',
    description: 'Premier digital education platform for Class 7 to 12 students.',
    url: 'https://vidhyavani.com',
    siteName: 'Vidhyavani App',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-amber-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
