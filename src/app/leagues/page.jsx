'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>All Leagues</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {leagues.map((league) => (
            <li key={league.idLeague}>
              {league.strLeague} ({league.strSport})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default League;
