export const tokenKey = "token_planigo";

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;

export const setToken = (token: string) =>
  localStorage.setItem(tokenKey, token);

export const removeToken = () => localStorage.removeItem(tokenKey);
