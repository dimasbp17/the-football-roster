'use client';

import Loading from '@/components/Loading';
import Search from '@/components/Search';
import { Button, Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Select from 'react-select';

const StandingPage = () => {
  const { idLeague } = useParams();
  const router = useRouter();
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
        const availableSeasons = response.data.seasons.map((season) => ({
          value: season.strSeason,
          label: season.strSeason,
        }));
        setSeasons(availableSeasons);
      } catch (error) {
        console.error('Error fetching season', error);
      }
    };
    fetchSeasons();
  }, [idLeague]);

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

  const TABLE_HEAD = [
    '#',
    'Club',
    'P',
    'W',
    'D',
    'L',
    'GI',
    'GO',
    'GD',
    'Points',
    'Form',
  ];
  return (
    <>
      <div className="w-full p-2 bg-navy">
        <Card className="flex flex-col p-5 mb-5 bg-yellow-500 text-navy lg:items-center lg:justify-between lg:flex-row">
          <h1 className="text-xl font-bold">Club Standings</h1>
          <Search onSearch={(value) => setSearchQuery(value)} />
        </Card>
        <div className="container flex justify-between mx-auto my-5 text-black">
          <Button
            className="flex items-center gap-2 capitalize bg-yellow-500 text-navy"
            onClick={() => router.back()}
          >
            <IoArrowBack size={15} /> Back
          </Button>
          <Select
            options={seasons}
            value={seasons.find((season) => season.value === selectSeason)}
            onChange={(selected) => setSelectSeason(selected.value)}
            className="text-black w-60"
            placeholder="Select Season"
          />
        </div>

        <div className="container mx-auto overflow-x-auto">
          {loading ? (
            <Loading />
          ) : (
            <table className="w-full text-left table-auto min-w-max">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="p-4 text-center text-black bg-yellow-500 border-b border-blue-gray-100"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold leading-none text-black"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clubStandings && clubStandings.length > 0 ? (
                  clubStandings.map((club, index) => (
                    <tr
                      key={club.idStanding}
                      className={`text-center border-b border-black ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                      }`}
                    >
                      <td className="w-10">{club.intRank}</td>
                      <td className="flex items-center gap-2 p-4">
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
                      {/* <td>{club.strDescription}</td> */}
                      <td className="font-bold">{club.intPoints}</td>
                      <td className="p-3">
                        <div className="flex justify-center gap-1">
                          {club.strForm
                            .split('')
                            .reverse()
                            .map((form, index) => {
                              let bgColor = '';
                              if (form === 'W') bgColor = 'bg-green-500';
                              else if (form === 'D') bgColor = 'bg-gray-500';
                              else if (form === 'L') bgColor = 'bg-red-500';

                              return (
                                <>
                                  <div className="flex flex-col">
                                    <span
                                      key={index}
                                      className={`size-6 flex items-center justify-center text-white font-medium ${bgColor} rounded-md `}
                                    >
                                      <span>{form}</span>
                                    </span>
                                    <span
                                      className={`${
                                        index === 4
                                          ? 'border-b-2  border-blue-500 mt-1'
                                          : ''
                                      }`}
                                    ></span>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </td>
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
            </table>
          )}

          <div className="my-5 text-white">
            <h1 className="font-bold">Information :</h1>
            <h5>dada</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default StandingPage;
