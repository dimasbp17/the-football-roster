'use client';

import Image from 'next/image';
import React from 'react';
import soccer_field from '@/assets/images/soccer-field.svg';
import stadium from '@/assets/images/stadium.jpg';
import { Button } from '@material-tailwind/react';

const HomeJumbotron = () => {
  return (
    <>
      {/* bg-[#4F8DE2] */}
      <div className="grid h-screen grid-cols-12 text-white font-lato">
        <div className="flex justify-center col-span-5 bg-[#4F8DE2]">
          <Image
            src={soccer_field}
            alt="soccer"
            className="h-screen"
          />
        </div>
        <div className="flex flex-col items-start justify-center col-span-7 bg-navy gap-y-2">
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
