'use client';

import { formatUSDC } from '@/lib/utils';

type OddsBtnProps = {
  label: '1' | 'X' | '2';
  price: number;
  selected?: boolean;
  variation?: number;
  onClick?: () => void;
};

export default function OddsBtn({
  label,
  price,
  selected,
  variation = 0,
  onClick,
}: OddsBtnProps) {
  const isUp = variation > 0;
  const isDown = variation < 0;

  let directionSymbol = '-';
  let variationColor = 'text-slate-400';

  if (isUp) {
    directionSymbol = 'UP';
    variationColor = 'text-accent';
  } else if (isDown) {
    directionSymbol = 'DN';
    variationColor = 'text-rose-400';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-sm border px-2 py-2 text-left transition ${
        selected
          ? 'border-accent bg-accent/20'
          : 'border-line bg-panel2 hover:border-slate-500 focus-visible:border-accent'
      }`}
    >
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-200">{label}</span>
        <span className={`text-[10px] ${variationColor}`}>
          {directionSymbol}
        </span>
      </div>
      <div className="mt-1 text-sm font-bold text-odd">
        {formatUSDC(price)}
      </div>
    </button>
  );
}
