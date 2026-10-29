import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoArrowForward } from 'react-icons/io5';
import league_logo from '@/data/league-logo';

const LeagueCard = ({ league, href }) => {
  const logo = league_logo[league.idLeague];
  const initials = league.strLeague
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 3);

  return (
    <Link
      href={href}
      className="relative flex items-center gap-4 p-4 overflow-hidden group rounded-2xl glass card-hover"
    >
      <div className="grid p-2 bg-white shrink-0 size-20 rounded-xl place-items-center">
        {logo ? (
          <Image
            src={logo}
            alt={league.strLeague}
            width={160}
            height={160}
            className="object-contain size-full"
          />
        ) : (
          <span className="text-2xl font-extrabold font-display text-pitch-950">
            {initials}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <span className="text-2xl font-bold leading-tight uppercase truncate font-display">
          {league.strLeague}
        </span>
        <span className="text-xs truncate text-white/50">
          {league.strLeagueAlternate || 'Football League'}
        </span>
      </div>
      <span className="grid transition rounded-full shrink-0 size-10 place-items-center bg-white/5 text-white/60 group-hover:bg-volt group-hover:text-pitch-950">
        <IoArrowForward />
      </span>
    </Link>
  );
};

export default LeagueCard;
