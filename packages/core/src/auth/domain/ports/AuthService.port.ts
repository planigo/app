import { LoginInput } from "../../usecases/Login/LoginInput";
import { LoginOutput } from "../../usecases/Login/LoginOutput";

export interface AuthServicePort {
    login: (loginInput: LoginInput) => Promise<LoginOutput>
}