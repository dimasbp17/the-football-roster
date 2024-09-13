import Image from 'next/image';
import React from 'react';
import stadiumm from '@/assets/images/stadium-2.jpg';

const About = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen text-white bg-black">
        <div className="relative w-full h-screen">
          <Image
            src={stadiumm}
            alt="Stadium"
            className="object-cover w-full h-full opacity-30"
          />
        </div>
        <div className="absolute">
          <h1 className="text-3xl font-bold">The Football Roster</h1>
          <span className=" max-w-[500px] text-center">
            The football roster is a website that provides various information
            about football starting from clubs, stadiums and players.
          </span>
          <h3 className="mt-5">Made By</h3>
          <p className="text-lg text-yellow-500">Dimas Bagus Prasetyo</p>
        </div>
      </section>
    </>
  );
};

export default About;
