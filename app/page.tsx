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
    <div className="min-h-screen flex flex-col bg-bg">
      <TopNavBar />
      
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-white">Sports</h1>
              <button className="p-2 hover:bg-panel2 rounded-lg transition">
                <Settings className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              {marketTypes.map((type) => (
                <button
                  key={type.name}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
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

        <aside className="w-80 border-l border-line bg-bg p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl">
                ⚽
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Featured Market</p>
                <p className="text-sm font-semibold text-white mb-1">World Cup 2026 Winner?</p>
                <p className="text-emerald-400 text-sm font-semibold">Buy Yes • Argentina</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-500 transition">
                Buy
              </button>
              <button className="flex-1 py-2 rounded-lg bg-panel2 text-slate-400 text-sm font-semibold hover:bg-panel transition">
                Sell
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Switch to</span>
              <button className="px-3 py-1.5 rounded-lg bg-panel2 text-xs font-semibold text-white hover:bg-panel transition flex items-center gap-2">
                Dollars
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div>
              <button className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition">
                Yes 82¢
              </button>
              <button className="w-full mt-2 py-3 rounded-lg bg-red-600/10 border border-red-600 text-red-400 font-semibold hover:bg-red-600/20 transition">
                No 19¢
              </button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-panel2 border border-line">
              <p className="text-sm font-semibold text-white mb-1">Amount</p>
              <p className="text-2xl font-bold text-slate-600">$0</p>
              <p className="text-xs text-emerald-400 mt-1">Earn 3.25% Interest</p>
            </div>

            <button className="w-full py-3 rounded-lg bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition">
              Sign up to trade
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
