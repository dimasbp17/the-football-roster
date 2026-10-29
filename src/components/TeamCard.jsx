import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdStadium } from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';

const TeamCard = ({ team, href, detailed = false }) => {
  const color = team.strColour1 || '#c6ff3d';

  const content = (
    <>
      {/* Aksen warna utama klub */}
      <div
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute rounded-full opacity-20 -right-10 -top-10 size-40 blur-3xl"
        style={{ backgroundColor: color }}
      />

      <div className="relative grid shrink-0 size-20 place-items-center">
        {team.strBadge && (
          <Image
            src={team.strBadge}
            alt={team.strTeam}
            width={160}
            height={160}
            className="object-contain transition duration-300 size-full drop-shadow-lg group-hover:scale-110"
          />
        )}
      </div>

      <div className="relative flex flex-col min-w-0 gap-1">
        <h2 className="text-2xl font-bold leading-tight uppercase truncate font-display">
          {team.strTeam}
        </h2>
        <p className="text-sm truncate text-white/50">
          {team.strKeywords || 'No nicknames'}
        </p>
        {detailed && (
          <div className="flex flex-wrap mt-2 text-xs gap-x-4 gap-y-1 text-white/70">
            <span className="flex items-center gap-1.5">
              <FaRegCalendarAlt className="text-volt" />
              {team.intFormedYear || '-'}
            </span>
            <span className="flex items-center gap-1.5">
              <MdStadium className="text-volt" />
              {team.strStadium || '-'}
            </span>
            <span className="flex items-center gap-1.5">
              <IoLocation className="text-volt" />
              {team.strLocation || '-'}
            </span>
          </div>
        )}
      </div>
    </>
  );

  const className =
    'relative flex items-center gap-5 p-5 pl-6 overflow-hidden group rounded-2xl glass card-hover';

  return href ? (
    <Link
      href={href}
      className={className}
    >
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default TeamCard;
