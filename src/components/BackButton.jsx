'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="btn-ghost !py-2.5"
      onClick={() => router.back()}
    >
      <IoArrowBack size={16} /> Back
    </button>
  );
};

export default BackButton;
