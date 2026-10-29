'use client';

import { useParams } from 'next/navigation';
import TeamList from '@/components/TeamList';

const LeagueTeams = () => {
  const { leagueName } = useParams();

  return (
    <TeamList
      leagueName={decodeURIComponent(leagueName || '')}
      detailed
    />
  );
};

export default LeagueTeams;
