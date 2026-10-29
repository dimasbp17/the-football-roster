import axios from 'axios';

// key "3" sudah dinonaktifkan oleh TheSportsDB, gunakan test key "123"
const api = axios.create({
  baseURL: 'https://www.thesportsdb.com/api/v1/json/123',
});

export const getSoccerLeagues = async () => {
  const { data } = await api.get('/all_leagues.php');
  return (data.leagues || []).filter((league) => league.strSport === 'Soccer');
};

export const getTeamsByLeague = async (leagueName) => {
  const { data } = await api.get('/search_all_teams.php', {
    params: { l: leagueName },
  });
  return data.teams || [];
};

export const getTeamByName = async (teamName) => {
  const { data } = await api.get('/searchteams.php', {
    params: { t: teamName },
  });
  return data.teams || [];
};

export const getStandings = async (idLeague, season) => {
  const { data } = await api.get('/lookuptable.php', {
    params: { l: idLeague, s: season },
  });
  return data.table || [];
};

export default api;
