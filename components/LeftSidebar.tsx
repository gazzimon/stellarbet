'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type SportCategory = {
  name: string;
  count: number;
  subcategories?: string[];
};

const sports: SportCategory[] = [
  { name: 'All', count: 1265 },
  { name: 'Basketball', count: 268 },
  { name: 'Hockey', count: 68 },
  { name: 'Soccer', count: 321 },
  { name: 'Tennis', count: 104 },
  { name: 'Golf', count: 23 },
  { name: 'Football', count: 51 },
  { name: 'MMA', count: 8 },
  { name: 'Cricket', count: 10 },
  { name: 'Baseball', count: 217 },
  { name: 'Boxing', count: 7 },
];

export default function LeftSidebar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <aside className="w-64 border-r border-line bg-bg h-full overflow-y-auto">
      <div className="p-4 space-y-1">
        {sports.map((sport) => {
          const isExpanded = expanded === sport.name;
          const hasSubcategories = sport.subcategories && sport.subcategories.length > 0;

          return (
            <div key={sport.name}>
              <button
                onClick={() => hasSubcategories && setExpanded(isExpanded ? null : sport.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition ${
                  sport.name === 'All'
                    ? 'text-emerald-400 bg-emerald-500/10'
                    : 'text-white hover:bg-panel2'
                }`}
              >
                <span>
                  {sport.name} <span className="text-slate-500">({sport.count})</span>
                </span>
                {hasSubcategories && (
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>
              {isExpanded && hasSubcategories && (
                <div className="ml-4 mt-1 space-y-1">
                  {sport.subcategories!.map((sub) => (
                    <button
                      key={sub}
                      className="w-full text-left px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-panel2 rounded-lg transition"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
