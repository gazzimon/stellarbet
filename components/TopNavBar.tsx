import Link from 'next/link';
import { Search } from 'lucide-react';

export default function TopNavBar() {
  return (
    <nav className="border-b border-line bg-bg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-emerald-400">
            StellarBet
          </Link>
          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/" className="text-white hover:text-emerald-400 transition">
              MARKETS
            </Link>
            <Link href="/live" className="text-slate-400 hover:text-white transition">
              LIVE <span className="text-emerald-400">12</span>
            </Link>
            <Link href="/social" className="text-slate-400 hover:text-white transition">
              SOCIAL
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Trade on anything"
              className="w-96 rounded-lg bg-panel2 border border-line pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
          <button className="px-4 py-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition">
            Log in
          </button>
          <button className="px-6 py-2 rounded-lg bg-emerald-500 text-sm font-semibold text-black hover:bg-emerald-400 transition">
            Sign up
          </button>
        </div>
      </div>

      <div className="border-t border-line px-6">
        <div className="flex items-center gap-6 overflow-x-auto py-3">
          <Link href="/?category=trending" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Trending
          </Link>
          <Link href="/?category=politics" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Politics
          </Link>
          <Link href="/?category=sports" className="text-sm font-medium text-white whitespace-nowrap">
            Sports
          </Link>
          <Link href="/?category=culture" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Culture
          </Link>
          <Link href="/?category=crypto" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Crypto
          </Link>
          <Link href="/?category=climate" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Climate
          </Link>
          <Link href="/?category=economics" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Economics
          </Link>
          <Link href="/?category=mentions" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Mentions
          </Link>
          <Link href="/?category=companies" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Companies
          </Link>
          <Link href="/?category=financials" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Financials
          </Link>
          <Link href="/?category=tech" className="text-sm font-medium text-slate-400 hover:text-white whitespace-nowrap transition">
            Tech & Science
          </Link>
        </div>
      </div>
    </nav>
  );
}
