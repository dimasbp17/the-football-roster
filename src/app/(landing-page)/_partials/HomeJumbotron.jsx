import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import stadium from '@/assets/images/stadium.jpg';
import field from '@/assets/svg/soccer-field.svg';
import { IoArrowForward } from 'react-icons/io5';
import { MdStadium } from 'react-icons/md';
import { PiListNumbersFill } from 'react-icons/pi';
import { SiPremierleague } from 'react-icons/si';
import league_logo from '@/data/league-logo';

const FEATURES = [
  {
    title: 'Clubs',
    description: 'Badges, kits, stadiums and the story behind every club.',
    icon: <MdStadium />,
    href: '/clubs',
  },
  {
    title: 'Standings',
    description: 'Live league tables with form guide and qualification zones.',
    icon: <PiListNumbersFill />,
    href: '/standing',
  },
  {
    title: 'Leagues',
    description: 'From the Premier League to the second tiers around the globe.',
    icon: <SiPremierleague />,
    href: '/leagues',
  },
];

const STATS = [
  { value: `${Object.keys(league_logo).length}+`, label: 'Leagues' },
  { value: '10', label: 'Seasons' },
  { value: 'Live', label: 'Tables' },
];

// musim Eropa dimulai sekitar Agustus
const now = new Date();
const seasonStart = now.getMonth() >= 7 ? now.getFullYear() : now.getFullYear() - 1;
const CURRENT_SEASON = `${seasonStart}/${String(seasonStart + 1).slice(2)}`;

const HomeJumbotron = () => {
  const logos = Object.values(league_logo);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center min-h-screen overflow-hidden">
        <Image
          src={stadium}
          alt="Stadium"
          fill
          priority
          placeholder="blur"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch-950 via-pitch-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-transparent to-pitch-950/50" />
        <Image
          src={field}
          alt="Field"
          className="absolute hidden -translate-y-1/2 w-[46rem] -right-40 top-1/2 opacity-[0.07] lg:block rotate-12"
        />

        <div className="relative w-full px-4 pt-24 pb-16 mx-auto max-w-7xl md:px-8">
          <div className="flex flex-col max-w-3xl gap-6">
            <span className="eyebrow animate-fade-up">
              <span className="relative flex size-2">
                <span className="absolute inline-flex rounded-full opacity-75 size-full bg-volt animate-ping" />
                <span className="relative inline-flex rounded-full size-2 bg-volt" />
              </span>
              Season {CURRENT_SEASON} is live
            </span>
            <h1
              className="text-[3.25rem] italic font-extrabold leading-[0.85] uppercase sm:text-8xl lg:text-9xl font-display animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              Get Your <br />
              <span className="text-gradient">Football</span> <br />
              Update
            </h1>
            <p
              className="max-w-xl text-lg text-white/70 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              Find various information from football around the world: clubs,
              stadiums, kits and league tables in one place.
            </p>
            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              <Link
                href="/clubs"
                className="btn-volt"
              >
                Explore Clubs <IoArrowForward />
              </Link>
              <Link
                href="/standing"
                className="btn-ghost"
              >
                View Standings
              </Link>
            </div>

            <dl
              className="grid max-w-md grid-cols-3 gap-6 pt-8 mt-4 border-t border-white/10 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs tracking-widest uppercase text-white/50">
                    {stat.label}
                  </dt>
                  <dd className="text-4xl font-extrabold font-display">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Marquee logo liga */}
      <section className="relative py-8 overflow-hidden border-y border-white/10 bg-pitch-900/60">
        <div className="flex gap-6 w-max animate-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="grid p-3 bg-white size-20 shrink-0 place-items-center rounded-2xl"
            >
              <Image
                src={logo}
                alt="League logo"
                width={120}
                height={120}
                className="object-contain size-full"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 pointer-events-none bg-gradient-to-r from-pitch-950" />
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none bg-gradient-to-l from-pitch-950" />
      </section>

      {/* Fitur */}
      <section className="px-4 py-20 mx-auto max-w-7xl md:px-8">
        <div className="flex flex-col gap-3 mb-10">
          <span className="eyebrow">Explore</span>
          <h2 className="text-5xl italic font-extrabold uppercase md:text-6xl font-display">
            Everything on the <span className="text-volt">Pitch</span>
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="relative flex flex-col gap-6 p-8 overflow-hidden group rounded-3xl glass card-hover"
            >
              <span className="absolute font-extrabold leading-none -right-4 -top-6 text-[10rem] font-display text-white/[0.03]">
                0{index + 1}
              </span>
              <span className="grid text-3xl transition size-14 rounded-2xl place-items-center bg-volt/10 text-volt group-hover:bg-volt group-hover:text-pitch-950">
                {feature.icon}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-4xl font-bold uppercase font-display">
                  {feature.title}
                </h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
              <span className="flex items-center gap-2 mt-auto text-sm font-bold tracking-wide uppercase text-volt">
                Open
                <IoArrowForward className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeJumbotron;
