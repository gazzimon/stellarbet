import TopNavBar from '@/components/TopNavBar';
import LeftSidebar from '@/components/LeftSidebar';
import MarketCard from '@/components/MarketCard';
import { worldCupMatches } from '@/lib/matches';
import { Settings } from 'lucide-react';

const marketTypes = [
  { name: 'Games', count: 759, active: true },
  { name: 'Props', count: 0, active: false },
  { name: 'Futures', count: 146, active: false },
  { name: 'Awards', count: 34, active: false },
  { name: 'Championship', count: 1, active: false },
];

export default function MarketsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <TopNavBar />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Sports</h1>
              <button className="rounded-lg p-2 transition hover:bg-panel2">
                <Settings className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="mb-6 flex items-center gap-3 overflow-x-auto pb-2">
              {marketTypes.map((type) => (
                <button
                  key={type.name}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    type.active
                      ? 'bg-emerald-600 text-white'
                      : 'bg-panel2 text-slate-400 hover:bg-panel hover:text-white'
                  }`}
                >
                  {type.name} ({type.count})
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {worldCupMatches.map((match) => (
                <MarketCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        </main>

        <aside className="w-80 overflow-y-auto border-l border-line bg-bg p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-sm font-bold text-black">
                SB
              </div>
              <div className="flex-1">
                <p className="mb-1 text-xs text-slate-500">Featured Market</p>
                <p className="mb-1 text-sm font-semibold text-white">World Cup 2026 Winner?</p>
                <p className="text-sm font-semibold text-emerald-400">Buy Yes - Argentina</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500">
                Buy
              </button>
              <button className="flex-1 rounded-lg bg-panel2 py-2 text-sm font-semibold text-slate-400 transition hover:bg-panel">
                Sell
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Switch to</span>
              <button className="flex items-center gap-2 rounded-lg bg-panel2 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-panel">
                Dollars
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div>
              <button className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-500">
                Yes 82c
              </button>
              <button className="mt-2 w-full rounded-lg border border-red-600 bg-red-600/10 py-3 font-semibold text-red-400 transition hover:bg-red-600/20">
                No 19c
              </button>
            </div>

            <div className="mt-4 rounded-lg border border-line bg-panel2 p-4">
              <p className="mb-1 text-sm font-semibold text-white">Amount</p>
              <p className="text-2xl font-bold text-slate-600">$0</p>
              <p className="mt-1 text-xs text-emerald-400">Earn 3.25% Interest</p>
            </div>

            <button className="w-full rounded-lg bg-emerald-500 py-3 font-bold text-black transition hover:bg-emerald-400">
              Sign up to trade
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
