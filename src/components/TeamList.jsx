'use client';

import React, { useEffect, useState } from 'react';
import { getTeamsByLeague } from '@/lib/api';
import Loading from './Loading';
import Search from './Search';
import PageHeader from './PageHeader';
import TeamCard from './TeamCard';
import EmptyState from './EmptyState';
import BackButton from './BackButton';

// Daftar klub dalam satu liga, dipakai halaman clubs dan leagues
const TeamList = ({ leagueName, getHref, detailed }) => {
  const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!leagueName) return;

      try {
        setTeams(await getTeamsByLeague(leagueName));
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [leagueName]);

  const filteredTeams = teams.filter((team) =>
    team.strTeam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader
        eyebrow={loading ? 'Clubs' : `${teams.length} Clubs`}
        title={leagueName}
      >
        <BackButton />
        <Search
          placeholder="Search club"
          onSearch={setSearchQuery}
        />
      </PageHeader>

      <div className="px-4 py-10 mx-auto max-w-7xl md:px-8">
        {loading ? (
          <Loading label="Loading clubs" />
        ) : filteredTeams.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTeams.map((team, index) => (
              <div
                key={team.idTeam}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <TeamCard
                  team={team}
                  href={getHref?.(team)}
                  detailed={detailed}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Teams"
            description="We couldn't find any club for this league."
          />
        )}
      </div>
    </>
  );
};

export default TeamList;
