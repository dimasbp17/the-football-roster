'use client';

import Image from 'next/image';
import React from 'react';
import stadium from '@/assets/images/stadium.jpg';
import { Button, Card } from '@material-tailwind/react';
import Link from 'next/link';
import { IoFootball, IoInformationCircle } from 'react-icons/io5';
import { MdStadium } from 'react-icons/md';
import { SiPremierleague } from 'react-icons/si';

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
      menu: 'About',
      icon: <IoInformationCircle />,
      href: '/about',
    },
  ];
  return (
    <>
      <div className="grid h-screen grid-cols-12 text-white font-lato cursor-custom">
        <div className="flex justify-center col-span-4 bg-[#4F8DE2] items-center p-10">
          <h1 className="absolute text-2xl font-bold top-10 left-10">
            TheFootball<span className="text-yellow-500">ROSTER</span>
          </h1>
          <div className="flex flex-col gap-3">
            {MENU.map((menu, index) => (
              <div key={index}>
                <Link href={menu.href}>
                  <Card className="flex flex-row items-center gap-2 px-10 py-2 text-sm font-medium text-black duration-200 bg-yellow-500 rounded-full shadow-xl hover:bg-yellow-600 cursor-custom">
                    <span>{menu.icon}</span>
                    <span>{menu.menu}</span>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center col-span-8 bg-navy gap-y-2">
          <div className="relative w-full h-screen">
            <Image
              src={stadium}
              alt="Stadium"
              className="object-cover w-full h-full opacity-15"
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
