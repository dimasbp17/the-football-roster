'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card } from '@material-tailwind/react';
import Image from 'next/image';
import Loading from '@/components/Loading';
import Link from 'next/link';
import Search from '@/components/Search';
import league_logo from '@/data/league-logo';

const League = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLeagues, setVisibleLeagues] = useState(10);

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

  const filteredLeagues = leagues.filter((league) =>
    league.strLeague.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const showMoreLeagues = () => {
    setVisibleLeagues((prev) => prev + 10);
  };

  return (
    <>
      <div className="p-2 bg-[#F5F7F8] h-full min-h-screen">
        <Card className="flex flex-col px-5 py-10 mb-5 text-white lg:items-center lg:justify-between lg:flex-row bg-navy">
          <h1 className="mb-2 text-xl font-bold lg:mb-0">All Leagues</h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        {loading ? (
          <div className="">
            <Loading />
          </div>
        ) : (
          <>
            {filteredLeagues.length > 0 ? (
              <div>
                <div className="grid w-full grid-cols-2 md:grid-cols-5 gap-4 p-3 bg-[#F5F7F8]">
                  {filteredLeagues.slice(0, visibleLeagues).map((league) => (
                    <div key={league.idLeague}>
                      <Link
                        href={`/leagues/${encodeURIComponent(
                          league.strLeague
                        )}`}
                      >
                        <Card className="p-3 bg-white border text-navy">
                          <div>
                            <Image
                              src={league_logo[league.idLeague]}
                              alt={league.strLeague}
                              width={1024}
                              height={1024}
                              className="object-cover h-[230px] rounded-lg"
                            />
                          </div>
                          <div className="mt-3 truncate">
                            <span className="font-semibold">
                              {league.strLeague}
                            </span>
                            <hr className="border border-navy" />
                            <span className="text-xs">
                              {league.strLeagueAlternate || '-'}
                            </span>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>

                {visibleLeagues < filteredLeagues.length && (
                  <div className="flex justify-center my-5">
                    <Button
                      size="lg"
                      className="capitalize bg-navy"
                      onClick={showMoreLeagues}
                    >
                      Show More
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">No League</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default League;
