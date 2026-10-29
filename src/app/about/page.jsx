import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import stadiumm from '@/assets/images/stadium-2.jpg';
import { IoArrowForward } from 'react-icons/io5';

const ITEMS = [
  { title: 'Clubs', text: 'Badges, kits, nicknames and history.' },
  { title: 'Stadiums', text: 'Where every club plays its home games.' },
  { title: 'Standings', text: 'League tables season by season.' },
];

const About = () => {
  return (
    <section className="relative flex items-center min-h-screen overflow-hidden">
      <Image
        src={stadiumm}
        alt="Stadium"
        fill
        placeholder="blur"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pitch-950 via-pitch-950/80 to-pitch-950/60" />

      <div className="relative grid w-full gap-10 px-4 py-32 mx-auto max-w-7xl md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-5 animate-fade-up">
          <span className="eyebrow">About</span>
          <h1 className="text-6xl italic font-extrabold leading-[0.9] uppercase md:text-8xl font-display">
            The Football <span className="text-gradient">Roster</span>
          </h1>
          <p className="max-w-lg text-lg text-white/70">
            The football roster is a website that provides various information
            about football starting from clubs, stadiums and players.
          </p>
          <div className="flex flex-col gap-1 pt-4">
            <span className="text-xs tracking-widest uppercase text-white/40">
              Made By
            </span>
            <span className="text-3xl font-bold uppercase font-display text-volt">
              Dimas Bagus Prasetyo
            </span>
          </div>
          <Link
            href="/clubs"
            className="mt-2 btn-volt w-fit"
          >
            Start Exploring <IoArrowForward />
          </Link>
        </div>

        <div className="grid gap-4">
          {ITEMS.map((item, index) => (
            <div
              key={item.title}
              className="flex items-center gap-5 p-6 rounded-3xl glass animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 120}ms` }}
            >
              <span className="text-5xl italic font-extrabold font-display text-volt">
                0{index + 1}
              </span>
              <div>
                <h3 className="text-2xl font-bold uppercase font-display">
                  {item.title}
                </h3>
                <p className="text-white/60">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
