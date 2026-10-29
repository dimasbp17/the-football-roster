'use client';

import Loading from '@/components/Loading';
import Search from '@/components/Search';
import PageHeader from '@/components/PageHeader';
import BackButton from '@/components/BackButton';
import EmptyState from '@/components/EmptyState';
import { getStandings } from '@/lib/api';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

// Liga yang musimnya mengikuti tahun kalender (contoh: "2026"), bukan "2025-2026"
const CALENDAR_YEAR_LEAGUES = [
  '4346', '4347', '4351', '4358', '4359', '4403', '4404', '4406',
];

const buildSeasons = (idLeague, total = 10) => {
  const now = new Date();
  const year = now.getFullYear();

  if (CALENDAR_YEAR_LEAGUES.includes(idLeague)) {
    return Array.from({ length: total }, (_, i) => `${year - i}`);
  }

  // musim Eropa dimulai sekitar Agustus
  const startYear = now.getMonth() >= 7 ? year : year - 1;
  return Array.from(
    { length: total },
    (_, i) => `${startYear - i}-${startYear - i + 1}`
  );
};

const getZone = (description = '') => {
  if (!description) return null;
  if (description.includes('Champions League')) return '#3b82f6';
  if (description.includes('Europa League')) return '#f97316';
  if (description.includes('Conference')) return '#10b981';
  if (description.includes('Relegation')) return '#ef4444';
  if (description.includes('Promotion')) return '#c6ff3d';
  return '#a855f7';
};

const FORM_COLOR = {
  W: 'bg-emerald-500',
  D: 'bg-slate-500',
  L: 'bg-rose-500',
};

const TABLE_HEAD = [
  { label: '#', className: 'w-12' },
  { label: 'Club', className: 'text-left' },
  { label: 'P' },
  { label: 'W' },
  { label: 'D' },
  { label: 'L' },
  { label: 'GF', className: 'hidden md:table-cell' },
  { label: 'GA', className: 'hidden md:table-cell' },
  { label: 'GD' },
  { label: 'Pts' },
  { label: 'Form', className: 'hidden lg:table-cell' },
];

const StandingPage = () => {
  const { idLeague } = useParams();
  const seasons = useMemo(() => buildSeasons(idLeague), [idLeague]);
  const [selectSeason, setSelectSeason] = useState(seasons[0]);
  const [clubStandings, setClubStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClubStandings = async () => {
      setLoading(true);
      try {
        setClubStandings(await getStandings(idLeague, selectSeason));
      } catch (error) {
        console.error('Error fetching', error);
        setClubStandings([]);
      } finally {
        setLoading(false);
      }
    };
    if (idLeague) {
      fetchClubStandings();
    }
  }, [idLeague, selectSeason]);

  const filteredStandings = clubStandings.filter((clubStanding) =>
    clubStanding.strTeam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leagueName = clubStandings[0]?.strLeague || 'League Table';
  const podium = clubStandings.slice(0, 3);
  const zones = [
    ...new Set(clubStandings.map((club) => club.strDescription).filter(Boolean)),
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Season ${selectSeason}`}
        title={leagueName}
      >
        <BackButton />
        <label className="relative">
          <select
            value={selectSeason}
            onChange={(e) => setSelectSeason(e.target.value)}
            className="w-full py-3 pl-5 pr-12 text-sm font-semibold text-white rounded-full appearance-none cursor-pointer sm:w-48 glass focus:border-volt focus:outline-none"
          >
            {seasons.map((season) => (
              <option
                key={season}
                value={season}
                className="bg-pitch-900"
              >
                {season}
              </option>
            ))}
          </select>
          <IoChevronDown className="absolute -translate-y-1/2 pointer-events-none right-5 top-1/2 text-volt" />
        </label>
        <Search
          placeholder="Search club"
          onSearch={setSearchQuery}
        />
      </PageHeader>

      <div className="flex flex-col gap-8 px-4 py-10 mx-auto max-w-7xl md:px-8">
        {loading ? (
          <Loading label="Loading table" />
        ) : clubStandings.length === 0 ? (
          <EmptyState
            title="No standings available"
            description="Try selecting another season."
          />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {podium.map((club) => (
                <div
                  key={club.idStanding}
                  className={`relative flex items-center gap-4 p-5 overflow-hidden rounded-3xl animate-fade-up ${
                    club.intRank === '1'
                      ? 'bg-volt text-pitch-950'
                      : 'glass'
                  }`}
                >
                  <span className="absolute text-[9rem] italic font-extrabold leading-none -right-2 -bottom-8 font-display opacity-10">
                    {club.intRank}
                  </span>
                  <Image
                    src={club.strBadge}
                    alt={club.strTeam}
                    width={80}
                    height={80}
                    className="object-contain size-14"
                  />
                  <div className="relative flex flex-col">
                    <span className="text-xs font-bold tracking-widest uppercase opacity-60">
                      {club.intRank === '1' ? 'Leader' : `Rank ${club.intRank}`}
                    </span>
                    <span className="text-2xl font-bold leading-tight uppercase font-display">
                      {club.strTeam}
                    </span>
                    <span className="text-sm font-semibold">
                      {club.intPoints} pts · {club.intPlayed} played
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-3xl glass">
              <table className="w-full text-sm text-center min-w-[560px]">
                <thead>
                  <tr className="text-xs tracking-widest uppercase border-b text-white/40 border-white/10">
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head.label}
                        className={`px-3 py-4 font-semibold ${head.className || ''}`}
                      >
                        {head.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStandings.map((club) => {
                    const zone = getZone(club.strDescription);
                    const form = (club.strForm || '').split('').reverse();

                    return (
                      <tr
                        key={club.idStanding}
                        className="transition border-b border-white/5 last:border-0 hover:bg-white/[0.04]"
                      >
                        <td className="relative px-3 py-3 font-bold">
                          {zone && (
                            <span
                              className="absolute left-0 w-1 rounded-r-full inset-y-2"
                              style={{ backgroundColor: zone }}
                              title={club.strDescription}
                            />
                          )}
                          {club.intRank}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3 text-left">
                            <Image
                              src={club.strBadge}
                              alt={club.strTeam}
                              width={32}
                              height={32}
                              className="object-contain size-7"
                            />
                            <span className="font-semibold">{club.strTeam}</span>
                          </div>
                        </td>
                        <td className="px-3 text-white/70">{club.intPlayed}</td>
                        <td className="px-3 text-white/70">{club.intWin}</td>
                        <td className="px-3 text-white/70">{club.intDraw}</td>
                        <td className="px-3 text-white/70">{club.intLoss}</td>
                        <td className="hidden px-3 md:table-cell text-white/70">
                          {club.intGoalsFor}
                        </td>
                        <td className="hidden px-3 md:table-cell text-white/70">
                          {club.intGoalsAgainst}
                        </td>
                        <td className="px-3 text-white/70">
                          {club.intGoalDifference > 0
                            ? `+${club.intGoalDifference}`
                            : club.intGoalDifference}
                        </td>
                        <td className="px-3 text-lg font-extrabold font-display text-volt">
                          {club.intPoints}
                        </td>
                        <td className="hidden px-3 lg:table-cell">
                          <div className="flex justify-center gap-1">
                            {form.map((result, index) => (
                              <span
                                key={index}
                                className={`grid size-6 place-items-center rounded-md text-[11px] font-bold ${
                                  FORM_COLOR[result] || 'bg-white/10'
                                } ${
                                  index === form.length - 1
                                    ? 'ring-2 ring-volt ring-offset-2 ring-offset-pitch-900'
                                    : ''
                                }`}
                              >
                                {result}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredStandings.length === 0 && (
                <p className="py-10 text-center text-white/50">
                  No club matches your search
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 p-6 rounded-3xl glass">
              <h2 className="text-2xl font-bold uppercase font-display">
                Information
              </h2>
              <div className="flex flex-wrap text-sm gap-x-6 gap-y-2 text-white/70">
                {zones.map((description) => (
                  <span
                    key={description}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="rounded-full size-3"
                      style={{ backgroundColor: getZone(description) }}
                    />
                    {description}
                  </span>
                ))}
                <span className="flex items-center gap-2">
                  <span className="rounded size-3 ring-2 ring-volt" />
                  Latest match in form guide
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StandingPage;
