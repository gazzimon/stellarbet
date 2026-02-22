'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type ProbabilityPoint = {
  minute: number;
  home: number;
  draw: number;
  away: number;
};

type ProbabilityChartProps = {
  data: ProbabilityPoint[];
};

export default function ProbabilityChart({ data }: ProbabilityChartProps) {
  return (
    <section className="surface p-3">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-300">Probabilidades en vivo</h2>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 6, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="homeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#24b36b" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#24b36b" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="drawGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f5d96a" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f5d96a" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="awayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2d343d" strokeDasharray="3 3" />
            <XAxis dataKey="minute" tick={{ fill: '#a6adbb', fontSize: 11 }} tickFormatter={(v) => `${v}'`} />
            <YAxis domain={[0, 1]} tick={{ fill: '#a6adbb', fontSize: 11 }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
            <Tooltip
              contentStyle={{ background: '#14171b', border: '1px solid #2d343d', borderRadius: 2 }}
              labelFormatter={(value) => `Minuto ${value}`}
              formatter={(value: number) => `${Math.round(value * 100)}%`}
            />
            <Area type="monotone" dataKey="home" stroke="#24b36b" fill="url(#homeGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="draw" stroke="#f5d96a" fill="url(#drawGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="away" stroke="#60a5fa" fill="url(#awayGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}