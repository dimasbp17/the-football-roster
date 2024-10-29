'use client';

import Search from '@/components/Search';
import { Card } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Loading';
import './style.css';
import Link from 'next/link';

const LeagueTeams = () => {
  const { leagueName } = useParams();
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!leagueName) return;

      try {
        const leagueQuery = leagueName.replace(/\s+/g, '%20');
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueQuery}`
        );

        if (response.data && response.data.teams) {
          setTeams(response.data.teams);
        } else {
          setTeams([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, [leagueName]);

  const filteredTeams = teams.filter((team) =>
    team.strTeam.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  const decodedLeagueName = decodeURIComponent(leagueName || '');

  return (
    <>
      <div className="w-full p-2 bg-navy">
        <Card className="flex flex-col px-5 py-5 mb-5 bg-yellow-500 lg:items-center lg:justify-between lg:flex-row text-navy">
          <h1 className="mb-2 text-2xl font-bold lg:mb-0">
            Team from the {decodedLeagueName}
          </h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredTeams.length > 0 ? (
              <div className="container grid grid-cols-1 gap-5 mx-auto md:grid-cols-2 font-lato">
                {filteredTeams.map((team) => (
                  <Link
                    key={team.idTeam}
                    href={`/clubs/${leagueName}/${team.strTeam}`}
                  >
                    <Card className="flex flex-row items-center w-full gap-4 p-4 text-black card-rounded-bot-right bg-blue-gray-50">
                      <div
                        className="absolute bottom-0 right-0 w-5 h-full p-0 rounded-r-lg"
                        style={{ backgroundColor: team.strColour1 }}
                      ></div>
                      <div>
                        <Image
                          src={team.strBadge}
                          alt={team.strTeam}
                          className="size-[50px] object-cover rounded-lg"
                          height={1024}
                          width={1024}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold ">{team.strTeam}</h1>
                        <h1 className="text-sm ">
                          {team.strKeywords || 'No nicknames'}
                        </h1>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-lg font-semibold text-center text-gray-500">
                No Teams
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LeagueTeams;
