import Image from 'next/image';
import React from 'react';
import ball_spin from '@/assets/images/ball-spin.png';

const Loading = () => {
  return (
    <>
      <div className="inset-0 flex items-center justify-center">
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
