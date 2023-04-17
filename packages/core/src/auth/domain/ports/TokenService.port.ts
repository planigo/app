export interface TokenServicePort {
    getToken: () => string | null
    setToken: (token: string) => void
    removeToken: () => void
}