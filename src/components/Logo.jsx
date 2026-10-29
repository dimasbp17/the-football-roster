import Link from 'next/link';
import { IoFootball } from 'react-icons/io5';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 group"
    >
      <span className="grid transition rounded-full size-9 place-items-center bg-volt text-pitch-950 group-hover:rotate-[360deg] duration-700">
        <IoFootball size={22} />
      </span>
      <span className="text-2xl italic font-extrabold leading-none tracking-tight uppercase font-display">
        TheFootball<span className="text-volt">Roster</span>
      </span>
    </Link>
  );
};

export default Logo;
