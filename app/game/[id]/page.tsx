'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import OddsBtn from '@/components/OddsBtn';
import ProbabilityChart, { ProbabilityPoint } from '@/components/ProbabilityChart';
import BetTicket from '@/components/BetTicket';
import LiveVideo from '@/components/LiveVideo';
import WalletConnect from '@/components/WalletConnect';
import { getMatchById, Selection } from '@/lib/matches';
import { clamp } from '@/lib/utils';

const selectionMap = {
  home: '1',
  draw: 'X',
  away: '2',
} as const;

function buildInitialData(): ProbabilityPoint[] {
  return [
    { minute: 0, home: 0.42, draw: 0.31, away: 0.27 },
    { minute: 15, home: 0.46, draw: 0.29, away: 0.25 },
    { minute: 30, home: 0.44, draw: 0.27, away: 0.29 },
    { minute: 45, home: 0.48, draw: 0.25, away: 0.27 },
    { minute: 60, home: 0.5, draw: 0.22, away: 0.28 },
  ];
}

export default function MatchLivePage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const match = getMatchById(params.id);

  const initialSelection = (search.get('selection') as Selection) || 'home';
  const [selected, setSelected] = useState<Selection>(['home', 'draw', 'away'].includes(initialSelection) ? initialSelection : 'home');
  const [chartData, setChartData] = useState<ProbabilityPoint[]>(buildInitialData());
  const [amount, setAmount] = useState(10);
  const [premiumMember, setPremiumMember] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [demoMode, setDemoMode] = useState(false);

  const [prices, setPrices] = useState(() => {
    if (!match) return { home: 2.4, draw: 3.2, away: 2.7 };
    return {
      home: match.prices.homeWin,
      draw: match.prices.draw,
      away: match.prices.awayWin,
    };
  });

  const [previousPrices, setPreviousPrices] = useState(prices);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrices((current) => {
        setPreviousPrices(current);

        const drift = {
          home: (Math.random() - 0.5) * 0.08,
          draw: (Math.random() - 0.5) * 0.08,
          away: (Math.random() - 0.5) * 0.08,
        };

        return {
          home: clamp(Number((current.home + drift.home).toFixed(2)), 1.5, 4.2),
          draw: clamp(Number((current.draw + drift.draw).toFixed(2)), 2.0, 5.0),
          away: clamp(Number((current.away + drift.away).toFixed(2)), 1.5, 4.2),
        };
      });

      setChartData((prev) => {
        const last = prev[prev.length - 1];
        const nextMinute = Math.min(last.minute + 3, 90);

        const home = clamp(last.home + (Math.random() - 0.5) * 0.04, 0.12, 0.75);
        const draw = clamp(last.draw + (Math.random() - 0.5) * 0.03, 0.08, 0.45);
        const away = clamp(1 - home - draw, 0.08, 0.65);
        const normalizedTotal = home + draw + away;

        const point: ProbabilityPoint = {
          minute: nextMinute,
          home: Number((home / normalizedTotal).toFixed(3)),
          draw: Number((draw / normalizedTotal).toFixed(3)),
          away: Number((away / normalizedTotal).toFixed(3)),
        };

        const updated = [...prev, point];
        return updated.length > 12 ? updated.slice(updated.length - 12) : updated;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const quickStats = useMemo(
    () => ({
      possession: '54% - 46%',
      shots: '8 - 6',
      yellows: '1 - 2',
    }),
    []
  );

  if (!match) {
    return (
      <main className="mx-auto max-w-4xl p-4">
        <p className="surface p-4 text-sm">Partido no encontrado.</p>
      </main>
    );
  }

  const selectedPrice = selected === 'home' ? prices.home : selected === 'draw' ? prices.draw : prices.away;

  return (
    <main className="mx-auto max-w-7xl p-3 md:p-4">
      <header className="mb-3 flex flex-wrap items-center justify-between gap-3 surface p-3">
        <div>
          <Link href="/" className="text-xs text-accent hover:underline">
            {'<-'} Volver a Markets
          </Link>
          <h1 className="mt-1 text-lg font-bold">{match.teams.home} vs {match.teams.away}</h1>
        </div>
        <div className="flex items-center gap-2">
          {match.isLive ? <span className="rounded bg-red-600/25 px-2 py-1 text-xs font-bold text-red-300">EN VIVO</span> : null}
          {demoMode ? (
            <label className="flex items-center gap-2 rounded-sm border border-line bg-panel2 px-2 py-1 text-xs">
              <input type="checkbox" checked={premiumMember} onChange={(e) => setPremiumMember(e.target.checked)} />
              Modo demo: Soy socio premium
            </label>
          ) : null}
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <LiveVideo home={match.teams.home} away={match.teams.away} premiumMember={premiumMember} />

          <section className="surface p-3">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Estadisticas rapidas</h2>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-sm border border-line bg-panel2 p-2">
                <p className="text-slate-400">Posesion</p>
                <p className="mt-1 font-semibold">{quickStats.possession}</p>
              </div>
              <div className="rounded-sm border border-line bg-panel2 p-2">
                <p className="text-slate-400">Tiros</p>
                <p className="mt-1 font-semibold">{quickStats.shots}</p>
              </div>
              <div className="rounded-sm border border-line bg-panel2 p-2">
                <p className="text-slate-400">Amarillas</p>
                <p className="mt-1 font-semibold">{quickStats.yellows}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-3">
          <ProbabilityChart data={chartData} />

          <section className="surface p-3">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Trading de outcome tokens</h2>
            <div className="grid grid-cols-3 gap-2">
              <OddsBtn
                label="1"
                price={prices.home}
                selected={selected === 'home'}
                variation={prices.home - previousPrices.home}
                onClick={() => setSelected('home')}
              />
              <OddsBtn
                label="X"
                price={prices.draw}
                selected={selected === 'draw'}
                variation={prices.draw - previousPrices.draw}
                onClick={() => setSelected('draw')}
              />
              <OddsBtn
                label="2"
                price={prices.away}
                selected={selected === 'away'}
                variation={prices.away - previousPrices.away}
                onClick={() => setSelected('away')}
              />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Seleccion actual: {selectionMap[selected]}</p>
          </section>

          <WalletConnect
            onWalletStatusChange={({ connected, demoMode: isDemo }) => {
              setWalletConnected(connected);
              setDemoMode(isDemo);
            }}
          />

          <BetTicket
            match={match}
            selection={selected}
            price={selectedPrice}
            amount={amount}
            onAmountChange={setAmount}
            canConfirm={walletConnected || demoMode}
          />
        </div>
      </section>
    </main>
  );
}
