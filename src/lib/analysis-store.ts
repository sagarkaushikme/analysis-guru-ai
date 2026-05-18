// Lightweight global store for analysis + credits (no external deps)
import { useSyncExternalStore } from "react";

export type Analysis = {
  id: string;
  date: string;
  instrument: string;
  timeframe: string;
  trade_score: number;
  score_label: string;
  pattern_name: string;
  pattern_type: "bullish" | "bearish" | "neutral";
  support: string;
  resistance: string;
  entry: string;
  stop_loss: string;
  target: string;
  risk_reward: string;
  risk_percent: string;
  win_probability: number;
  trend: string;
  bullish_scenario: string;
  bearish_scenario: string;
  mistakes: string[];
  action_points: string[];
  summary: string;
  emotion_detected: string;
  risk_level: string;
  roast: string;
  trader_iq: number;
  ai_confidence: number;
  alerts: string[];
  indicators: { rsi: string; macd: string; ema: string };
};

export const DUMMY_ANALYSIS: Analysis = {
  id: "demo-1",
  date: new Date().toISOString(),
  instrument: "BANKNIFTY 45200CE",
  timeframe: "5min",
  trade_score: 7,
  score_label: "Good Setup",
  pattern_name: "Bullish Engulfing",
  pattern_type: "bullish",
  support: "45080",
  resistance: "45480",
  entry: "45200",
  stop_loss: "45000",
  target: "45680",
  risk_reward: "1:2.4",
  risk_percent: "3.2",
  win_probability: 62,
  trend: "Sideways to Bullish",
  bullish_scenario: "If price closes above 45300, target of 45480-45680 is possible.",
  bearish_scenario: "If 45080 breaks, it can fall to 44800 — exit immediately.",
  mistakes: ["Late breakout entry", "Risk too high", "FOMO detected", "Overleveraged"],
  action_points: [
    "Hold above 45300",
    "Exit at 45080",
    "Keep position size at 2%",
    "Watch 9:30am volume",
    "Be cautious during expiry week",
  ],
  summary: "Setup is solid. Bullish engulfing on support is a strong signal. Reduce position size.",
  emotion_detected: "FOMO",
  risk_level: "medium-high",
  roast: "This trade looks like FOMO — the price was already 2% up and you entered then?",
  trader_iq: 74,
  ai_confidence: 82,
  alerts: ["Momentum weakening", "High reversal probability near 45480", "Expiry week gamma risk"],
  indicators: { rsi: "58 - Neutral", macd: "Positive crossover", ema: "Above 20 EMA" },
};

type State = {
  credits: number;
  current: Analysis | null;
  history: Analysis[];
  historyLoading: boolean;
  historyLoaded: boolean;
  initialized: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
};

let state: State = {
  credits: 0,
  current: null,
  history: [],
  historyLoading: false,
  historyLoaded: false,
  initialized: false,
  user: null,
};

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const store = {
  get: () => state,
  setCurrent(a: Analysis) {
    state = { ...state, current: a, history: [a, ...state.history.filter((h) => h.id !== a.id)] };
    emit();
  },
  useCredit() {
    if (state.credits > 0) state = { ...state, credits: state.credits - 1 };
    emit();
  },
  addCredits(n: number) {
    state = { ...state, credits: state.credits + n };
    emit();
  },
  setCredits(n: number) {
    state = { ...state, credits: n };
    emit();
  },
  setHistory(analyses: Analysis[]) {
    state = {
      ...state,
      history: analyses,
      historyLoading: false,
      historyLoaded: true,
    };
    emit();
  },
  setHistoryLoading(loading: boolean) {
    state = { ...state, historyLoading: loading };
    emit();
  },
  setUser(user: State["user"], credits: number) {
    state = { ...state, user, credits, initialized: true };
    emit();
  },
  finishInit() {
    state = { ...state, initialized: true };
    emit();
  },
  logout() {
    state = {
      credits: 0,
      current: null,
      history: [],
      historyLoading: false,
      historyLoaded: false,
      initialized: true,
      user: null,
    };
    emit();
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useStore() {
  return useSyncExternalStore(
    (cb) => store.subscribe(cb),
    () => state,
    () => state,
  );
}
