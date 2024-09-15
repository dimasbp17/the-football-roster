'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@material-tailwind/react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Link from 'next/link';
import Search from '@/components/Search';
import league_logo from '@/data/league-logo';

const League = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get(
          'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php'
        );

        // filter hanya mengambil soccer saja
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

  const filteredLeaugues = leagues.filter((league) =>
    league.strLeague.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <>
      <div className="p-2 bg-[#F5F7F8] ">
        <Card className="flex flex-row items-center justify-between px-5 py-10 mb-5 text-black border">
          <h1 className="text-lg font-bold">All Leagues</h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        {loading ? (
          <div className="absolute top-1/2 right-1/2">
            <Loading />
          </div>
        ) : (
          <>
            {filteredLeaugues.length > 0 ? (
              <Card className="grid w-full grid-cols-5 gap-3 p-3 border">
                {filteredLeaugues.map((league) => (
                  <div key={league.idLeague}>
                    <Link href={'/'}>
                      <Card className="p-3 text-white border bg-navy">
                        <div>
                          <Image
                            src={league_logo[league.idLeague]}
                            alt={league.strLeague}
                            width={1024}
                            height={1024}
                            className="w-[200px] h-[200px] object-cover"
                          />
                        </div>
                        <div className="mt-2 truncate">
                          <span className="font-semibold">
                            {league.strLeague}
                          </span>
                          <hr />
                          <span className="text-xs">
                            {league.strLeagueAlternate || '-'}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  </div>
                ))}
              </Card>
            ) : (
              <div className="text-center text-gray-500">No Data</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default League;
