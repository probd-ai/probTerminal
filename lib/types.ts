export interface BreadthPoint {
  date: string;
  bull_pct: number;
  bear_pct: number;
  neutral_pct: number;
  net_breadth: number;
  R_ratio: number;
}

export interface MarketPulse {
  regime: 'BULL' | 'CAUTION' | 'BEAR' | 'RECOVERY';
  regime_confidence: number;
  R_ratio: number;
  R_state: 'HIGH' | 'MID' | 'LOW';
  R_quintile: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Q5';
  R_slope_21d: 'RISING' | 'FLAT' | 'DECLINING';
  R_slope_value: number;
  bull_pct: number;
  bear_pct: number;
  neutral_pct: number;
  net_breadth: number;
  beta_order: number;
  win_prob_22d: number;
  f7_count: number;
  breadth_history: BreadthPoint[];
}

export interface Sector {
  name: string;
  short_name: string;
  median_truevx: number;
  breadth_pct: number;
  state: 'HOT' | 'WARM' | 'COOLING' | 'COLD';
  momentum_7d: number;
  ignition_alert: boolean;
  stock_count: number;
  cascade_followers: string[];
  follow_probability: number;
  pre_ignition_leader: boolean;
}

export interface CascadeAlert {
  active: boolean;
  triggered_by: string;
  triggered_date: string;
  expected_followers: string[];
  probability: number;
  days_since_trigger: number;
  regime_note?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  sector: string;
  truevx: number;
  mean_short: number;
  mean_mid: number;
  mean_long: number;
  state: 'ACCELERATING' | 'DECELERATING' | 'PEAK_ROLLOVER' | 'BASE_BUILDING' | 'EARLY_RECOVERY' | 'LATE_DECLINE';
  level_zone: 'STRETCHED' | 'ELEVATED' | 'NEUTRAL' | 'LOW' | 'DEPRESSED';
  flow_status: 'IN_THE_FLOW' | 'LONE_WOLF' | 'LAGGARD_HOT' | 'OUT_OF_FLOW';
  expected_22d: number;
  expected_222d: number;
}

export interface StateDistribution {
  ACCELERATING: number;
  DECELERATING: number;
  PEAK_ROLLOVER: number;
  BASE_BUILDING: number;
  EARLY_RECOVERY: number;
  LATE_DECLINE: number;
}

export interface SnapshotMeta {
  last_updated: string;
  week_of: string;
  universe: string;
  total_stocks: number;
  data_version: string;
}

export interface Snapshot {
  meta: SnapshotMeta;
  market_pulse: MarketPulse;
  sectors: Sector[];
  cascade_alert: CascadeAlert;
  f7_stocks: Stock[];
  in_the_flow: Stock[];
  watchlist: Stock[];
  s6_stocks: Stock[];
  state_distribution: StateDistribution;
  weekly_brief: string;
}
