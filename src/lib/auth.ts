const API = import.meta.env.VITE_API_URL;

// Token localStorage mein save karo
export function getToken(): string | null {
  return localStorage.getItem("tradeai_token");
}

export function setToken(token: string): void {
  localStorage.setItem("tradeai_token", token);
}

export function removeToken(): void {
  localStorage.removeItem("tradeai_token");
}

// Signup
export async function signUp(name: string, email: string, password: string) {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  setToken(data.token);
  return data;
}

// Login
export async function signIn(email: string, password: string) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  setToken(data.token);
  return data;
}

// Logout
export async function signOut() {
  const token = getToken();
  if (token) {
    await fetch(`${API}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  removeToken();
}

// Current user lo
export async function getMe() {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    removeToken();
    return null;
  }

  const data = await res.json();
  return data.user;
}

// Auth header helper
export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
