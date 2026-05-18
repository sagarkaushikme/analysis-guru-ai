import type { Analysis } from "@/lib/analysis-store";
import { getToken } from "@/lib/auth";
import { store } from "@/lib/analysis-store";

const API = import.meta.env.VITE_API_URL;

export async function fetchAnalyses(): Promise<Analysis[]> {
  const token = getToken();
  if (!token) return [];

  const res = await fetch(`${API}/analyses`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) return [];
  if (!res.ok) throw new Error("Failed to load history");

  const data = await res.json();
  return Array.isArray(data.analyses) ? data.analyses : [];
}

export async function loadUserHistory(): Promise<void> {
  if (!getToken()) {
    store.setHistory([]);
    return;
  }

  store.setHistoryLoading(true);
  try {
    const analyses = await fetchAnalyses();
    store.setHistory(analyses);
  } catch {
    store.setHistory([]);
  }
}
