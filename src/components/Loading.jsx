import Image from 'next/image';
import React from 'react';
import ball_spin from '@/assets/images/ball-spin.png';

const Loading = ({ label = 'Loading' }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-volt/30 blur-xl animate-pulse" />
        <Image
          src={ball_spin}
          alt="Ball Spinner"
          width={1024}
          height={1024}
          className="relative size-14 animate-spin"
        />
      </div>
      <span className="text-xs font-semibold tracking-[0.3em] uppercase text-white/50">
        {label}
      </span>
    </div>
  );
};

export default Loading;
