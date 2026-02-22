'use client';

import { formatUSDC } from '@/lib/utils';
import type { Match, Selection } from '@/lib/data';

type TicketSummaryProps = {
  match: Match;
  selection: Selection;
  price: number;
  amount: number;
  onAmountChange: (value: number) => void;
  canConfirm: boolean;
};

const selectionLabel: Record<Selection, string> = {
  home: '1 (Local)',
  draw: 'X (Empate)',
  away: '2 (Visitante)',
};

export default function TicketSummary({
  match,
  selection,
  price,
  amount,
  onAmountChange,
  canConfirm,
}: TicketSummaryProps) {
  const total = amount * price;

  return (
    <section className="surface p-3">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">Ticket / Resumen</h2>
      <div className="space-y-2 text-xs">
        <div className="rounded-sm border border-line bg-panel2 p-2">
          <p className="text-slate-400">Partido</p>
          <p>{match.teams.home} vs {match.teams.away}</p>
        </div>
        <div className="rounded-sm border border-line bg-panel2 p-2">
          <p className="text-slate-400">Seleccion</p>
          <p className="font-semibold text-odd">{selectionLabel[selection]}</p>
        </div>

        <label className="block">
          <span className="mb-1 block text-slate-400">Cantidad (outcome tokens)</span>
          <input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => onAmountChange(Math.max(1, Number(e.target.value) || 1))}
            className="w-full rounded-sm border border-line bg-panel2 px-2 py-1.5 text-slate-100 outline-none focus:border-accent"
          />
        </label>

        <div className="rounded-sm border border-line bg-panel2 p-2">
          <p className="text-slate-400">Precio unitario</p>
          <p>{formatUSDC(price)}</p>
        </div>

        <div className="rounded-sm border border-line bg-panel2 p-2">
          <p className="text-slate-400">Costo total</p>
          <p className="text-base font-bold text-odd">{formatUSDC(total)}</p>
        </div>

        <button
          type="button"
          disabled={!canConfirm}
          className={`w-full rounded-sm border px-3 py-2 text-xs font-bold ${
            canConfirm
              ? 'border-accent bg-accent text-black'
              : 'cursor-not-allowed border-line bg-slate-700/30 text-slate-400'
          }`}
        >
          Confirmar operacion
        </button>
      </div>
    </section>
  );
}
