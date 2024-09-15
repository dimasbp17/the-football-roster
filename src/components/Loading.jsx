import Image from 'next/image';
import React from 'react';
import ball_spin from '@/assets/images/ball-spin.png';

const Loading = () => {
  return (
    <>
      <div className="absolute top-1/2 right-1/2">
        <Image
          src={ball_spin}
          alt="Ball Spinner"
          width={1024}
          height={1024}
          className="size-20 animate-spin"
        />
      </div>
    </>
  );
};

export default Loading;
