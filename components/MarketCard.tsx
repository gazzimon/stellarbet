'use client';

import { useRouter } from 'next/navigation';
import type { Match } from '@/lib/matches';

type MarketCardProps = {
  match: Match;
};

export default function MarketCard({ match }: MarketCardProps) {
  const router = useRouter();

  // Convert decimal odds to percentage probability
  const homeProb = Math.round((1 / match.prices.homeWin) * 100);
  const drawProb = Math.round((1 / match.prices.draw) * 100);
  const awayProb = Math.round((1 / match.prices.awayWin) * 100);

  // Convert to cents (assuming odds represent dollar values)
  const homeCents = Math.round((1 / match.prices.homeWin) * 100);
  const noCents = 100 - homeCents;

  return (
    <button
      onClick={() => router.push(`/game/${match.id}`)}
      className="w-full border border-line bg-panel rounded-lg p-4 hover:bg-panel2 transition text-left"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-slate-500">{match.league}</span>
            {match.isLive && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                LIVE
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-white">
            {match.teams.home} vs {match.teams.away}
          </h3>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{match.teams.home}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{homeProb}%</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/game/${match.id}?bet=yes`);
              }}
              className="px-4 py-1.5 rounded-lg border border-emerald-600 bg-emerald-600/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/20 transition"
            >
              Yes {homeCents}¢
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/game/${match.id}?bet=no`);
              }}
              className="px-4 py-1.5 rounded-lg border border-red-600 bg-red-600/10 text-red-400 text-xs font-semibold hover:bg-red-600/20 transition"
            >
              No {noCents}¢
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Draw</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{drawProb}%</span>
            <button
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-1.5 rounded-lg border border-emerald-600 bg-emerald-600/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/20 transition"
            >
              Yes {Math.round((1 / match.prices.draw) * 100)}¢
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-1.5 rounded-lg border border-red-600 bg-red-600/10 text-red-400 text-xs font-semibold hover:bg-red-600/20 transition"
            >
              No {100 - Math.round((1 / match.prices.draw) * 100)}¢
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">{match.teams.away}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{awayProb}%</span>
            <button
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-1.5 rounded-lg border border-emerald-600 bg-emerald-600/10 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/20 transition"
            >
              Yes {Math.round((1 / match.prices.awayWin) * 100)}¢
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-1.5 rounded-lg border border-red-600 bg-red-600/10 text-red-400 text-xs font-semibold hover:bg-red-600/20 transition"
            >
              No {100 - Math.round((1 / match.prices.awayWin) * 100)}¢
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
        <span className="text-xs text-slate-500">{match.time}</span>
        <span className="text-xs text-slate-500">Click to view details</span>
      </div>
    </button>
  );
}
