'use client';

import { useRouter } from 'next/navigation';
import type { Match, Selection } from '@/lib/matches';
import OddsBtn from './OddsBtn';

type MatchRowProps = {
  match: Match;
};

export default function MatchRow({ match }: MatchRowProps) {
  const router = useRouter();

  const openMatch = (selection?: Selection) => {
    const base = `/game/${match.id}`;
    router.push(selection ? `${base}?selection=${selection}` : base);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openMatch();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openMatch()}
      onKeyDown={onKeyDown}
      className="grid cursor-pointer grid-cols-[1.3fr_0.5fr_0.5fr_0.5fr] items-center gap-2 border-b border-line px-3 py-2 transition hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Abrir mercado de ${match.teams.home} vs ${match.teams.away}`}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{match.teams.home} vs {match.teams.away}</div>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
          <span>{match.time}</span>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${match.isLive ? 'bg-red-600/20 text-red-400' : 'bg-slate-700/40 text-slate-300'}`}>
            {match.isLive ? 'LIVE' : 'Programado'}
          </span>
        </div>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <OddsBtn label="1" price={match.prices.homeWin} onClick={() => openMatch('home')} />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <OddsBtn label="X" price={match.prices.draw} onClick={() => openMatch('draw')} />
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <OddsBtn label="2" price={match.prices.awayWin} onClick={() => openMatch('away')} />
      </div>
    </div>
  );
}
