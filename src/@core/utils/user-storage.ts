import { User } from "../../store/authSlice";

export interface Token {
  token: string;
}
const TOKEN_KEY = "token";

export function getUserToken(): Token | null {
  const storedUser = localStorage.getItem(TOKEN_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setUserToken(tokens: Token): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

export function clearUserToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

const USER_KEY = "userData";

export function getUserData(): User | null {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function setUserData(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUserData(): void {
  localStorage.removeItem(USER_KEY);
}
