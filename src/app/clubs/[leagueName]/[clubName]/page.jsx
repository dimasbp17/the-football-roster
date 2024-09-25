'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import banner from '@/assets/images/stadium-2.jpg';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { IoIosFootball } from 'react-icons/io';
import { MdStadium } from 'react-icons/md';
import { GiTrumpet } from 'react-icons/gi';
import { IoLocation } from 'react-icons/io5';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Loading';

const ClubDetail = () => {
  const { clubName } = useParams();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const fetchClubsDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${clubName}`
        );
        setClubs(response.data.teams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching clubs', error);
        setLoading(false);
      }
    };
    fetchClubsDetail();
  }, [clubName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!clubs || clubs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-bold">No clubs data</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-hidden">
        {clubs.map((club) => (
          <>
            <section className="w-full">
              <Image
                src={club.strFanart1}
                alt={club.strTeam}
                width={1024}
                height={1024}
                className="w-full object-cover h-[50vh]"
              />
            </section>
            <div className="w-full p-4">
              <div className="grid grid-cols-12 my-5">
                <div className="flex items-center justify-center col-span-full lg:col-span-3">
                  <Image
                    src={club.strBadge}
                    alt="Logo"
                    width={1024}
                    height={1024}
                    className="size-[200px] object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1 font-semibold col-span-full lg:col-span-4">
                  <h1 className="mb-2 text-3xl font-bold">{club.strTeam}</h1>

                  <div className="flex items-center gap-2">
                    <FaRegCalendarAlt /> <span>{club.intFormedYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosFootball /> <span>{club.strTeamAlternate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdStadium /> <span>{club.strStadium}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GiTrumpet /> <span>{club.strKeywords || '-'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoLocation /> <span>{club.strLocation}</span>
                  </div>
                </div>

                <div className="flex justify-center col-span-full lg:col-span-5">
                  <Image
                    src={club.strEquipment}
                    alt={`Logo, ${club.strTeam}`}
                    width={1024}
                    height={1024}
                    className="size-[200px] object-cover"
                  />
                </div>
              </div>
              <div className="my-5 lg:mx-10">
                <h1 className="text-xl font-bold">Description Clubs</h1>
                <div className="text-justify">
                  {readMore
                    ? club.strDescriptionEN
                    : `${club.strDescriptionEN.slice(0, 500)}...`}
                  <button
                    onClick={() => setReadMore(!readMore)}
                    className="ml-2 font-medium text-blue-500"
                  >
                    {readMore ? 'Read Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ClubDetail;
