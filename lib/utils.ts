export function formatUSDC(value: number): string {
  return `${value.toFixed(2)} USDC`;
}

export function abbreviateKey(key: string, keep = 4): string {
  if (key.length <= keep * 2) return key;
  return `${key.slice(0, keep)}...${key.slice(-keep)}`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}