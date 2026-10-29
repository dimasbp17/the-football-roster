'use client';

import LeagueList from '@/components/LeagueList';

const League = () => {
  return (
    <LeagueList
      eyebrow="Leagues & Cups"
      title="All Leagues"
      description="Every football competition we track, from top flights to second tiers."
      getHref={(league) => `/leagues/${encodeURIComponent(league.strLeague)}`}
    />
  );
};

export default League;
