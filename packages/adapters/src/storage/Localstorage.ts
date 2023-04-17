import { TokenServicePort } from "@planigo/core/lib/auth/domain/ports/TokenService.port"

const tokenKey: string = "token_planigo";

export const useLocalStorage = (): TokenServicePort => {
    const getToken = (): string | null => {
        return typeof window !== undefined ? localStorage.getItem(tokenKey) : null;
    }

    const setToken = (token: string): void => {
        localStorage.setItem(tokenKey, token);
    }

    const removeToken = (): void => {
        localStorage.removeItem(tokenKey);
    }

    return {
        getToken,
        setToken,
        removeToken
    }
}