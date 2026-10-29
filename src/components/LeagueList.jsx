'use client';

import React, { useEffect, useState } from 'react';
import { getSoccerLeagues } from '@/lib/api';
import Loading from './Loading';
import Search from './Search';
import PageHeader from './PageHeader';
import LeagueCard from './LeagueCard';
import EmptyState from './EmptyState';

// Daftar liga yang dipakai halaman clubs, leagues dan standing
const LeagueList = ({ eyebrow, title, description, getHref }) => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLeagues, setVisibleLeagues] = useState(12);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLeagues(await getSoccerLeagues());
      } catch (error) {
        console.error('Error fetching leagues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  const filteredLeagues = leagues.filter((league) =>
    league.strLeague.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      >
        <Search
          placeholder="Search league"
          onSearch={setSearchQuery}
        />
      </PageHeader>

      <div className="px-4 py-10 mx-auto max-w-7xl md:px-8">
        {loading ? (
          <Loading label="Loading leagues" />
        ) : filteredLeagues.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredLeagues.slice(0, visibleLeagues).map((league, index) => (
                <div
                  key={league.idLeague}
                  className="animate-fade-up"
                  style={{ animationDelay: `${(index % 12) * 40}ms` }}
                >
                  <LeagueCard
                    league={league}
                    href={getHref(league)}
                  />
                </div>
              ))}
            </div>

            {visibleLeagues < filteredLeagues.length && (
              <div className="flex justify-center mt-10">
                <button
                  className="btn-volt"
                  onClick={() => setVisibleLeagues((prev) => prev + 12)}
                >
                  Show More
                </button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No League"
            description="Try another keyword."
          />
        )}
      </div>
    </>
  );
};

export default LeagueList;
