import { Barlow_Condensed, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});
const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: 'The Football Roster',
  description:
    'Clubs, leagues and standings from football around the world.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} font-sans flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
