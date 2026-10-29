'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { MdStadium } from 'react-icons/md';
import { GiTrumpet } from 'react-icons/gi';
import {
  IoGlobeOutline,
  IoLocation,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from 'react-icons/io5';
import { useParams } from 'next/navigation';
import { getTeamByName } from '@/lib/api';
import Loading from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import BackButton from '@/components/BackButton';

const InfoTile = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-4 rounded-2xl glass">
    <span className="grid text-lg rounded-xl shrink-0 size-10 place-items-center bg-volt/10 text-volt">
      {icon}
    </span>
    <div className="flex flex-col min-w-0">
      <span className="text-[11px] font-semibold tracking-widest uppercase text-white/40">
        {label}
      </span>
      <span className="font-semibold break-words">{value || '-'}</span>
    </div>
  </div>
);

const ClubDetail = () => {
  const { clubName } = useParams();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const fetchClubsDetail = async () => {
      try {
        const teams = await getTeamByName(decodeURIComponent(clubName));
        setClub(teams[0] || null);
      } catch (error) {
        console.error('Error fetching clubs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClubsDetail();
  }, [clubName]);

  if (loading) {
    return (
      <div className="pt-24">
        <Loading label="Loading club" />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="pt-24">
        <EmptyState
          title="No clubs data"
          description="This club could not be found."
        />
      </div>
    );
  }

  const color = club.strColour1 || '#c6ff3d';
  const description = club.strDescriptionEN || '';
  const socials = [
    { icon: <IoGlobeOutline />, url: club.strWebsite },
    { icon: <IoLogoFacebook />, url: club.strFacebook },
    { icon: <IoLogoTwitter />, url: club.strTwitter },
    { icon: <IoLogoInstagram />, url: club.strInstagram },
    { icon: <IoLogoYoutube />, url: club.strYoutube },
  ].filter((social) => social.url);

  return (
    <>
      <section className="relative flex items-end min-h-[70vh] overflow-hidden">
        {club.strFanart1 && (
          <Image
            src={club.strFanart1}
            alt={club.strTeam}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/70 to-pitch-950/30" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-color"
          style={{ backgroundColor: color }}
        />

        <div className="relative flex flex-col w-full gap-6 px-4 pb-10 mx-auto pt-28 max-w-7xl md:px-8 md:flex-row md:items-end">
          {club.strBadge && (
            <Image
              src={club.strBadge}
              alt="Logo"
              width={400}
              height={400}
              className="object-contain size-32 md:size-44 drop-shadow-2xl animate-fade-up"
            />
          )}
          <div className="flex flex-col flex-1 gap-3 animate-fade-up">
            <span className="eyebrow">
              {club.strLeague} · {club.strCountry}
            </span>
            <h1 className="text-6xl italic font-extrabold leading-[0.9] uppercase md:text-8xl font-display">
              {club.strTeam}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              {[club.strColour1, club.strColour2, club.strColour3]
                .filter(Boolean)
                .map((colour) => (
                  <span
                    key={colour}
                    className="border rounded-full size-5 border-white/30"
                    style={{ backgroundColor: colour }}
                  />
                ))}
              {socials.map((social) => (
                <a
                  key={social.url}
                  href={`https://${social.url.replace(/^https?:\/\//, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="grid transition rounded-full size-9 place-items-center glass hover:bg-volt hover:text-pitch-950"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <BackButton />
        </div>
      </section>

      <div className="grid gap-8 px-4 py-10 mx-auto max-w-7xl md:px-8 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoTile
              icon={<FaRegCalendarAlt />}
              label="Founded"
              value={club.intFormedYear}
            />
            <InfoTile
              icon={<MdStadium />}
              label="Stadium"
              value={club.strStadium}
            />
            <InfoTile
              icon={<IoLocation />}
              label="Location"
              value={club.strLocation}
            />
            <InfoTile
              icon={<GiTrumpet />}
              label="Nicknames"
              value={club.strKeywords}
            />
            <div className="sm:col-span-2">
              <InfoTile
                icon={<IoIosFootball />}
                label="Also known as"
                value={club.strTeamAlternate}
              />
            </div>
          </div>

          {description && (
            <div className="p-6 rounded-3xl glass">
              <h2 className="mb-4 text-3xl font-bold uppercase font-display">
                Club <span className="text-volt">Story</span>
              </h2>
              <p className="leading-relaxed whitespace-pre-line text-white/70">
                {readMore || description.length <= 500
                  ? description
                  : `${description.slice(0, 500)}...`}
              </p>
              {description.length > 500 && (
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="mt-4 text-sm font-bold tracking-wide uppercase text-volt hover:underline"
                >
                  {readMore ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}
        </div>

        {club.strEquipment && (
          <aside className="relative flex flex-col items-center gap-4 p-6 overflow-hidden rounded-3xl glass h-fit">
            <div
              className="absolute rounded-full opacity-30 size-60 blur-3xl top-10"
              style={{ backgroundColor: color }}
            />
            <h2 className="relative self-start text-3xl font-bold uppercase font-display">
              Home <span className="text-volt">Kit</span>
            </h2>
            <Image
              src={club.strEquipment}
              alt={`Kit, ${club.strTeam}`}
              width={600}
              height={600}
              className="relative object-contain w-full max-w-xs drop-shadow-2xl"
            />
          </aside>
        )}
      </div>
    </>
  );
};

export default ClubDetail;
