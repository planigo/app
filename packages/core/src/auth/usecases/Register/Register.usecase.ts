import { User } from "../../domain/models/User.model"
import { AuthServicePort } from "../../domain/ports/AuthService.port"

export type RegisterInput = {
    firstname: string
    lastname: string
    email: string
    password: string
}

export type RegisterOutput = {
    user: User
}

export class Register {
    static async execute(authService: AuthServicePort, payload: RegisterInput): Promise<RegisterOutput> {
        return authService.register(payload)
    }
}