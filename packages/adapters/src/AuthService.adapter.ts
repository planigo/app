import { axiosInstance } from "./config/axios";
import { AuthServicePort } from "@planigo/core/lib/auth/domain/ports/AuthService.port"
import type { LoginOutput } from "@planigo/core/lib/auth/usecases/Login/LoginOutput"
import type { LoginInput } from "@planigo/core/lib/auth/usecases/Login/LoginInput"
import type { RegisterInput, RegisterOutput } from "@planigo/core/lib/auth/usecases/Register/Register.usecase"

export function useAuthService(): AuthServicePort {
    const login = async (loginInput: LoginInput): Promise<LoginOutput> => {
        const response = await axiosInstance.post<LoginOutput>("/auth/login", loginInput)
        return response.data
    }

    const register = async (registerInput: RegisterInput): Promise<RegisterOutput> => {
        const response = await axiosInstance.post<RegisterOutput>("/users/customer", registerInput)
        return response.data
    }

    return {
        login,
        register
    }
}