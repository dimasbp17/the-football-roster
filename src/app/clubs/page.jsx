'use client';

import LeagueList from '@/components/LeagueList';

const ClubsPage = () => {
  return (
    <LeagueList
      eyebrow="Clubs"
      title="Pick a League"
      description="Choose a competition to browse every club competing in it."
      getHref={(league) => `/clubs/${encodeURIComponent(league.strLeague)}`}
    />
  );
};

export default ClubsPage;
