'use client';

import Image from 'next/image';
import React from 'react';
import stadium from '@/assets/images/stadium.jpg';
import { Button, Card } from '@material-tailwind/react';
import Link from 'next/link';
import { IoFootball, IoInformationCircle } from 'react-icons/io5';
import { MdStadium } from 'react-icons/md';
import { SiPremierleague } from 'react-icons/si';
import ball_spin from '@/assets/images/ball-spin.png';
import field from '@/assets/svg/soccer-field.svg';
import { PiListNumbersFill } from 'react-icons/pi';

const HomeJumbotron = () => {
  const MENU = [
    {
      menu: 'Home',
      icon: <IoFootball />,
      href: '/',
    },
    {
      menu: 'Clubs',
      icon: <MdStadium />,
      href: '/clubs',
    },
    {
      menu: 'League',
      icon: <SiPremierleague />,
      href: '/leagues',
    },
    {
      menu: 'Standing',
      icon: <PiListNumbersFill />,
      href: '/standing',
    },
    {
      menu: 'About',
      icon: <IoInformationCircle />,
      href: '/about',
    },
  ];
  return (
    <>
      <div className="grid h-screen grid-cols-12 text-white font-lato cursor-custom">
        <div className="flex items-center justify-center p-10 col-span-full md:col-span-4 bg-navy">
          <div className="absolute hidden lg:block">
            <Image
              src={field}
              alt="Field"
              className="opacity-10"
            />
          </div>
          <h1 className="absolute hidden text-2xl font-bold top-10 left-10 md:block">
            TheFootball<span className="text-yellow-500">ROSTER</span>
          </h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 ">
            {MENU.map((menu, index) => (
              <div key={index}>
                <Link href={menu.href}>
                  <Card className="flex flex-row items-center gap-2 px-10 py-2 text-sm font-medium text-black duration-300 bg-yellow-500 rounded-full shadow-xl hover:bg-blue-600 hover:text-yellow-500 cursor-custom">
                    <span>{menu.icon}</span>
                    <span>{menu.menu}</span>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
          <div className="absolute bottom-10 left-10">
            <Image
              src={ball_spin}
              alt="Ball Spinner"
              width={1024}
              height={1024}
              className="size-10 animate-spin"
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center bg-black col-span-full md:col-span-8 gap-y-2">
          <div className="relative w-full h-screen">
            <Image
              src={stadium}
              alt="Stadium"
              className="object-cover w-full h-full opacity-40"
              layout="fill"
              priority
            />
          </div>
          <div className="absolute flex flex-col px-24 gap-y-5">
            <span className="text-5xl font-bold">
              Get <span className="text-yellow-500">Football</span> Update
            </span>
            <span className="text-xl font-medium">
              Find various information from football around the world
            </span>

            <Button
              size="lg"
              color="yellow"
              className="capitalize rounded-full text-navy"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeJumbotron;
