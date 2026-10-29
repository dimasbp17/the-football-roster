import Link from 'next/link';
import Logo from './Logo';
import MENU from '@/data/menu';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-pitch-900/60">
      <div className="flex flex-col gap-6 px-4 py-10 mx-auto max-w-7xl md:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="text-sm text-white/50">
            Data provided by{' '}
            <a
              href="https://www.thesportsdb.com"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-volt"
            >
              TheSportsDB
            </a>
          </p>
        </div>
        <ul className="flex flex-wrap gap-5 text-sm font-semibold text-white/60">
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-volt"
              >
                {item.menu}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Dimas Bagus Prasetyo
        </p>
      </div>
    </footer>
  );
};

export default Footer;
