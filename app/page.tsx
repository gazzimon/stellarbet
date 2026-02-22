import MatchRow from '@/components/MatchRow';
import TopCategories from '@/components/TopCategories';
import { categories, worldCupMatches } from '@/lib/data';

function groupByDate() {
  return worldCupMatches.reduce<Record<string, typeof worldCupMatches>>((acc, match) => {
    if (!acc[match.dateLabel]) acc[match.dateLabel] = [];
    acc[match.dateLabel].push(match);
    return acc;
  }, {});
}

export default function MarketsPage() {
  const grouped = groupByDate();

  return (
    <main className="mx-auto max-w-6xl p-3 md:p-4">
      <header className="mb-3 surface p-3">
        <h1 className="text-lg font-bold">StellarBet Markets</h1>
        <p className="text-xs text-slate-400">Prediction markets deportivos en Stellar (USDC outcome tokens)</p>
      </header>

      <TopCategories categories={categories} active="World Cup 2026" />

      <section className="mt-3 surface overflow-hidden">
        <div className="grid grid-cols-[1.3fr_0.5fr_0.5fr_0.5fr] border-b border-line bg-panel2 px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-slate-400">
          <div className="text-left">Partido</div>
          <div>1</div>
          <div>X</div>
          <div>2</div>
        </div>

        {Object.entries(grouped).map(([date, matches]) => (
          <div key={date}>
            <div className="border-b border-line bg-black/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {date}
            </div>
            {matches.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}