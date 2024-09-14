import Image from 'next/image';
import React from 'react';
import ball_spin from '@/assets/images/ball-spin.png';

const Loading = () => {
  return (
    <>
      <div>
        <Image
          src={ball_spin}
          alt="Ball Spinner"
          width={1024}
          height={1024}
          className="size-10 animate-spin"
        />
      </div>
    </>
  );
};

export default Loading;
