'use client';

import Search from '@/components/Search';
import { Card } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Loading';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdStadium } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { GiTrumpet } from 'react-icons/gi';
import './style.css';

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
      <div className="w-full p-2">
        <Card className="flex flex-row items-center justify-between px-5 py-10 mb-5 text-white bg-navy">
          <h1 className="text-xl font-bold">
            Team from the {decodedLeagueName}
          </h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        {loading ? (
          <Loading />
        ) : (
          <>
            {filteredTeams.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 font-lato">
                {filteredTeams.map((team) => (
                  <Card
                    key={team.idTeam}
                    className="flex flex-row w-full gap-4 p-4 text-black border card-rounded-bot-right bg-blue-gray-50"
                  >
                    <div
                      className="absolute bottom-0 right-0 w-5 h-full p-0 rounded-r-lg"
                      style={{ backgroundColor: team.strColour1 }}
                    ></div>
                    <div>
                      <Image
                        src={team.strBadge}
                        alt={team.strTeam}
                        className="size-[150px] object-cover rounded-lg"
                        height={1024}
                        width={1024}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-2xl font-bold ">{team.strTeam}</h1>
                      <div className="flex items-center gap-2 font-medium">
                        <FaRegCalendarAlt />
                        {team.intFormedYear}
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <GiTrumpet />
                        {team.strKeywords || '-'}
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <MdStadium />
                        {team.strStadium}
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <FaLocationDot />
                        {team.strLocation}
                      </div>
                    </div>
                  </Card>
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
