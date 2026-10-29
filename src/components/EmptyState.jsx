import React from 'react';
import { TbBallFootballOff } from 'react-icons/tb';

const EmptyState = ({ title = 'No data', description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <span className="grid text-3xl rounded-full size-16 place-items-center glass text-white/40">
        <TbBallFootballOff />
      </span>
      <h3 className="text-2xl font-bold uppercase font-display">{title}</h3>
      {description && (
        <p className="max-w-sm text-sm text-white/50">{description}</p>
      )}
    </div>
  );
};

export default EmptyState;
