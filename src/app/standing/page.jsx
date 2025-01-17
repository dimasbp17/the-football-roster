'use client';

import Loading from '@/components/Loading';
import Search from '@/components/Search';
import league_logo from '@/data/league-logo';
import { Button, Card } from '@material-tailwind/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';

const Standing = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLeagues, setVisibleLeagues] = useState(10);
  const router = useRouter();

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
      <div className="h-full p-2 bg-navy">
        <Card className="flex flex-col p-5 mb-5 bg-yellow-500 text-navy lg:items-center lg:justify-between lg:flex-row">
          <h1 className="text-xl font-bold">All Leagues</h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredLeagues.length > 0 ? (
              <div className="container mx-auto">
                <Button
                  className="flex items-center gap-2 mb-5 capitalize bg-yellow-500 text-navy"
                  onClick={() => router.back()}
                >
                  <IoArrowBack size={15} /> Back
                </Button>
                <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 ">
                  {filteredLeagues.slice(0, visibleLeagues).map((league) => (
                    <div key={league.idLeague}>
                      <Link href={`/standing/${league.idLeague}`}>
                        <Card className="flex flex-row items-center w-full gap-3 p-3 duration-300 bg-white border text-navy hover:scale-105">
                          <div>
                            <Image
                              src={league_logo[league.idLeague]}
                              alt={league.strLeague}
                              width={1024}
                              height={1024}
                              className="object-cover h-[100px] w-[100px] rounded-lg"
                            />
                          </div>
                          <div className="flex flex-col w-full gap-1">
                            <span className="text-lg font-semibold">
                              {league.strLeague}
                            </span>
                            <hr className="w-full border border-navy" />
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
                      className="capitalize bg-yellow-500 text-navy"
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

export default Standing;
