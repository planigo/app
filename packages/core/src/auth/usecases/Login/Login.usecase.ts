import { AuthServicePort } from "../../domain/ports/AuthService.port"
import { LoginInput } from "./LoginInput"
import { LoginOutput } from "./LoginOutput"

export class Login {
    static async execute(authService: AuthServicePort, payload: LoginInput): Promise<LoginOutput> {
        return authService.login(payload)
    }
}