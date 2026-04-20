import type { Snapshot } from './types';

// In production, this is fetched from /public/data/snapshot.json
// Backoffice uploads a fresh JSON every Sunday
export async function getSnapshot(): Promise<Snapshot> {
  // Static import for build-time optimization
  // In Next.js, this will be bundled at build time
  const data = await import('../public/data/snapshot.json');
  return data.default as unknown as Snapshot;
}

export function formatPct(v: number, decimals = 1): string {
  return `${v >= 0 ? '+' : ''}${v.toFixed(decimals)}%`;
}

export function formatR(v: number): string {
  return v.toFixed(2);
}

export function getRegimeColor(regime: string): string {
  switch (regime) {
    case 'BULL': return 'var(--teal)';
    case 'RECOVERY': return 'var(--amber)';
    case 'CAUTION': return '#f97316';
    case 'BEAR': return 'var(--rose)';
    default: return 'var(--text-2)';
  }
}

export function getRegimeBadge(regime: string): string {
  switch (regime) {
    case 'BULL': return 'badge-bull';
    case 'RECOVERY': return 'badge-watch';
    case 'CAUTION': return 'badge-watch';
    case 'BEAR': return 'badge-bear';
    default: return 'badge-gray';
  }
}

export function getSectorStateColor(state: string): string {
  switch (state) {
    case 'HOT': return 'var(--teal)';
    case 'WARM': return '#4ade80';
    case 'COOLING': return 'var(--amber)';
    case 'COLD': return 'var(--rose)';
    default: return 'var(--text-2)';
  }
}

export function getStockStateLabel(state: string): string {
  const map: Record<string, string> = {
    ACCELERATING: 'Accelerating',
    DECELERATING: 'Decelerating',
    PEAK_ROLLOVER: 'Peak / Overshoot',
    BASE_BUILDING: 'Base Building',
    EARLY_RECOVERY: 'Early Recovery',
    LATE_DECLINE: 'Mid-Supported',
  };
  return map[state] || state;
}

export function getFlowBadgeClass(flow: string): string {
  switch (flow) {
    case 'IN_THE_FLOW': return 'badge-bull';
    case 'LONE_WOLF': return 'badge-watch';
    case 'LAGGARD_HOT': return 'badge-regime';
    case 'OUT_OF_FLOW': return 'badge-bear';
    default: return 'badge-gray';
  }
}

export function getFlowLabel(flow: string): string {
  const map: Record<string, string> = {
    IN_THE_FLOW: 'In the Flow',
    LONE_WOLF: 'Lone Wolf',
    LAGGARD_HOT: 'Laggard Hot',
    OUT_OF_FLOW: 'Out of Flow',
  };
  return map[flow] || flow;
}
