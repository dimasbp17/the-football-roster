'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@material-tailwind/react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Link from 'next/link';

const League = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php'
        );

        const soccerLeagues = response.data.leagues.filter(
          (league) => league.strSport === 'Soccer'
        );

        setLeagues(soccerLeagues);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leagues:', error);
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return (
    <>
      <div className="">
        <h1>All Leagues</h1>
        {loading ? (
          <div className="absolute top-1/2 right-1/2">
            <Loading />
          </div>
        ) : (
          <div className="grid w-full grid-cols-6 gap-3 p-5">
            {leagues.map((league) => (
              <div key={league.idLeague}>
                <Link href={'/'}>
                  <Card className="h-32 p-3 text-black bg-white border">
                    <div>
                      <Image
                        src={''}
                        alt="Image"
                      />
                    </div>
                    <div>{league.strLeague}</div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default League;
