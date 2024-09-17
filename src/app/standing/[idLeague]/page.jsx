'use client';

import { Card, Option, Select, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ball from '@/assets/images/ball-spin.png';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/components/Loading';
import Search from '@/components/Search';

const StandingPage = () => {
  const { idLeague } = useParams();
  const [clubStandings, setClubStandings] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [selectSeason, setSelectSeason] = useState('2024-2025');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?id=${idLeague}`
        );
        const availableSeasons = response.data.seasons.map(
          (season) => season.strSeason
        );
        setSeasons(availableSeasons);
      } catch (error) {
        console.error('Error fetching season', error);
      }
    };
    fetchSeasons();
  });

  useEffect(() => {
    const fetchClubStandings = async () => {
      try {
        const response = await axios.get(
          `https://www.thesportsdb.com/api/v1/json/3/lookuptable.php?l=${idLeague}&s=${selectSeason}`
        );
        setClubStandings(response.data.table);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching', error);
        setLoading(false);
      }
    };
    if (idLeague) {
      fetchClubStandings();
    }
  }, [idLeague, selectSeason]);

  const TABLE_HEAD = ['Club', 'P', 'W', 'D', 'L', 'GM', 'GK', 'SG', 'Poin'];
  return (
    <>
      <div className="w-full p-2">
        <Card className="flex flex-row items-center justify-between px-5 py-10 text-white bg-navy">
          <h1 className="text-xl font-bold">Club Standings</h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        <div className="flex items-end justify-end my-5 text-black w-60">
          <Select
            label="Select Season"
            className="text-black"
            value={selectSeason}
            onChange={(e) => setSelectSeason(e)}
          >
            {seasons.map((season) => (
              <Option
                key={season}
                value={season}
              >
                {season}
              </Option>
            ))}
          </Select>
        </div>
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 text-center text-white border-b border-blue-gray-100 bg-navy"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none text-white"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          {loading ? (
            <Loading />
          ) : (
            <tbody>
              {clubStandings && clubStandings.length > 0 ? (
                clubStandings.map((club) => (
                  <tr
                    key={club.idStanding}
                    className="text-center border-b border-black"
                  >
                    <td className="flex items-center gap-2 p-4">
                      {club.intRank}
                      <Image
                        src={club.strBadge}
                        alt="ball"
                        width={30}
                        height={30}
                      />
                      {club.strTeam}
                    </td>
                    <td>{club.intPlayed}</td>
                    <td>{club.intWin}</td>
                    <td>{club.intDraw}</td>
                    <td>{club.intLoss}</td>
                    <td>{club.intGoalsFor}</td>
                    <td>{club.intGoalsAgainst}</td>
                    <td>{club.intGoalDifference}</td>
                    <td className="font-bold">{club.intPoints}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={TABLE_HEAD.length}
                    className="text-center"
                  >
                    No standings available
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default StandingPage;
