export type Selection = 'home' | 'draw' | 'away';

export type Match = {
  id: string;
  league: string;
  dateLabel: string;
  time: string;
  isLive: boolean;
  teams: {
    home: string;
    away: string;
    homeIcon?: string;
    awayIcon?: string;
  };
  prices: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
};

export const categories = [
  'Liga Profesional',
  'Fútbol',
  'Resultados',
  'Tenis',
  'Básquetbol',
  'World Cup 2026',
];

export const worldCupMatches: Match[] = [
  {
    id: 'wc26-arg-bra',
    league: 'World Cup 2026',
    dateLabel: 'Dom 22 feb',
    time: '15:00',
    isLive: true,
    teams: { home: 'Argentina', away: 'Brasil' },
    prices: { homeWin: 2.12, draw: 3.21, awayWin: 2.66 },
  },
  {
    id: 'wc26-esp-fra',
    league: 'World Cup 2026',
    dateLabel: 'Dom 22 feb',
    time: '17:30',
    isLive: false,
    teams: { home: 'España', away: 'Francia' },
    prices: { homeWin: 2.55, draw: 3.1, awayWin: 2.48 },
  },
  {
    id: 'wc26-usa-mex',
    league: 'World Cup 2026',
    dateLabel: 'Dom 22 feb',
    time: '20:00',
    isLive: false,
    teams: { home: 'USA', away: 'México' },
    prices: { homeWin: 2.29, draw: 3.4, awayWin: 2.95 },
  },
  {
    id: 'wc26-ger-ned',
    league: 'World Cup 2026',
    dateLabel: 'Lun 23 feb',
    time: '14:00',
    isLive: false,
    teams: { home: 'Alemania', away: 'Países Bajos' },
    prices: { homeWin: 2.38, draw: 3.18, awayWin: 2.77 },
  },
  {
    id: 'wc26-eng-por',
    league: 'World Cup 2026',
    dateLabel: 'Lun 23 feb',
    time: '18:45',
    isLive: true,
    teams: { home: 'Inglaterra', away: 'Portugal' },
    prices: { homeWin: 2.42, draw: 3.28, awayWin: 2.69 },
  },
  {
    id: 'wc26-uru-col',
    league: 'World Cup 2026',
    dateLabel: 'Lun 23 feb',
    time: '21:15',
    isLive: false,
    teams: { home: 'Uruguay', away: 'Colombia' },
    prices: { homeWin: 2.67, draw: 3.08, awayWin: 2.52 },
  },
];

export function getMatchById(id: string): Match | undefined {
  return worldCupMatches.find((match) => match.id === id);
}