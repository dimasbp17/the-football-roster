'use client';

import { Button, Card } from '@material-tailwind/react';
import React from 'react';

const HomeJumbotron = () => {
  return (
    <>
      <div className="grid h-screen grid-cols-12 text-white">
        <div className="col-span-5 bg-[#4F8DE2]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
          tempore similique a porro libero eaque ipsum impedit quo. Sit natus
          ipsam consequatur vero in nobis asperiores eaque corrupti sed
          praesentium?
        </div>
        <div className="col-span-7 bg-[#153484] p-5 flex-col flex items-start justify-center">
          <span className="text-5xl font-bold">Get Football Update</span>
          <span className="text-xl font-medium">
            Temukan berbagai informasi dari sepakbola di seluruh dunia
          </span>
        </div>
      </div>
    </>
  );
};

export default HomeJumbotron;
