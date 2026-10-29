'use client';

import { useParams } from 'next/navigation';
import TeamList from '@/components/TeamList';

const LeagueTeams = () => {
  const { leagueName } = useParams();
  const decodedLeagueName = decodeURIComponent(leagueName || '');

  return (
    <TeamList
      leagueName={decodedLeagueName}
      getHref={(team) =>
        `/clubs/${leagueName}/${encodeURIComponent(team.strTeam)}`
      }
    />
  );
};

export default LeagueTeams;
