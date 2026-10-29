'use client';

import LeagueList from '@/components/LeagueList';

const Standing = () => {
  return (
    <LeagueList
      eyebrow="Standings"
      title="League Tables"
      description="Who's top, who's chasing and who's in the drop zone."
      getHref={(league) => `/standing/${league.idLeague}`}
    />
  );
};

export default Standing;
